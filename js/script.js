const defineElement = (tagName, propList, propValList) => {
   const element = document.createElement(tagName)
   for (let i = 0; i < propList.length; i++)
      element[propList[i]] = propValList[i]
   return element
}
/*
The showPage function shows 9 students each page, and receive student database and page 
number as arguments
*/
const showPage = (list, page) => {
   const startIdx = (page * 9) - 9
   const endIdx = page * 9
   const studentList = document.querySelector('.student-list')
   studentList.innerHTML = ''
   for (let i = 0; i < list.length; i++) {
      if (i >= startIdx && i < endIdx) {

         const apToStudentDetails = (tagName, propList, propValList) => {
            const element = defineElement(tagName, propList, propValList)
            studentDetails.appendChild(element)
         }

         const studentItem = defineElement('li', ['className'], ['student-item cf'])
         const studentDetails = defineElement('div', ['className'], ['student-details'])
         studentList.appendChild(studentItem).appendChild(studentDetails)

         apToStudentDetails('img', ['className', 'src', 'alt'], ['avatar', list[i].picture.large, 'Profile Picture'])
         apToStudentDetails('h3', ['textContent'], [`${list[i].name.first} ${list[i].name.last}`])
         apToStudentDetails('span', ['className', 'textContent'], ['email', list[i].email])

         const joinedDetails = defineElement('div', ['className'], ['joined-details'])
         const date = defineElement('span', ['className', 'textContent'], ['date', `Joined ${list[i].registered.date}`])
         studentItem.appendChild(joinedDetails).appendChild(date)

      }
   }
}

/*
The addPagination function display a interactive pagination and receive student database 
as an argument
*/
const addPagination = (list) => {
   const num = Math.ceil(list.length / 9)
   const linkList = document.querySelector('.link-list')
   linkList.innerHTML = ''

   for (let i = 1; i <= num; i++) {
      const LI = document.createElement('li')
      const button = defineElement('button', ['type', 'textContent'], ['button', i])
      linkList.appendChild(LI).appendChild(button)
   }
   document.querySelectorAll('button')[0].className = 'active'
   linkList.addEventListener('click', (event) => {
      event.preventDefault()
      if (event.target.type == 'button') {
         const active = document.querySelector('.active')
         active.className = ''
         event.target.className = 'active'
         showPage(list, event.target.textContent)
      }
   })
}

/*
Call two function so that when page first fresh, the first 9 students and pagination can be 
displayed immediately
*/
showPage(data, 1)
addPagination(data)

/*
Show the search bar outlook with DOM
*/
const header = document.querySelector('.header')

const studentSearch = defineElement('label', ['htmlFor', 'className'], ['search', 'student-search'])

const input = defineElement('input', ['id', 'placeholder'], ['search', 'Search by name...'])

const button = defineElement('button', ['type'], ['button'])

const img = defineElement('img', ['src', 'alt'], ['img/icn-search.svg', 'Search icon'])

header.appendChild(studentSearch)
studentSearch.appendChild(input)
studentSearch.appendChild(button)
button.appendChild(img)

/*
The searchFunction works on search part and receive input infomation and student database as
arguments
*/
const searchFunction = (input, data) => {
   let searchList = []
   let j = 0
   for (let i = 0; i < data.length; i++) {
      let Name = `${data[i].name.first} ${data[i].name.last}`
      if (input.value.length >= 0 && Name.toLowerCase().includes(input.value.toLowerCase())) {
         searchList[j] = data[i]
         j++
      }
   }

   showPage(searchList, 1)
   addPagination(searchList)
   //call two previous functions in searchFunction so that when search part actived,
   //those two functions can be actived too

   const ul = document.querySelector('.student-list')
   const H1 = document.createElement('h1')
   if (searchList.length == 0) {
      H1.innerHTML = 'No results found'
      ul.appendChild(H1)
   }
   //when no results found, display a text to inform user.
   /* 
   I add the inform text to H1 which is ul's child since the innerHTML of ul('.student-list') 
   is cleaned up whenever showPage is called. So there won't be two or more texts displayed at the same time.
   And no inform text will display after the searched students appear in page
   */
}


button.addEventListener('click', () => {
   searchFunction(input, data)
})
//when search button is clicked, searchFunction will be actived

input.addEventListener('keyup', () => {
   searchFunction(input, data)
})
//when user input any infomation, searchFunction will be actived

