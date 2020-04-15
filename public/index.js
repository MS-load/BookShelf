//The general GET request (all books)
fetch('http://localhost:3000/api/books/')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    printBooks(data)
  })
  .catch(error => console.error(error))

//Rendering all books
function printBooks(data) {
  const row = document.querySelector('.row')
  data.forEach(element => {
    const col = document.createElement('div')
    col.classList.add("column")
    const card = document.createElement('div')
    card.classList.add("card")
    card.setAttribute("data-id", element.id)
    const title = document.createElement('h4')
    const author = document.createElement('p')
    const year = document.createElement('p')
    const del = document.createElement('button')
    const edit = document.createElement('button')
    del.innerHTML = `Delete`
    del.onclick = deleteBook
    edit.innerHTML = `Edit`
    edit.onclick = showModal
    title.innerHTML = element.name
    author.innerHTML = `author: ${element.author}`
    year.innerHTML = `year: ${element.year}`
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(year)
    card.appendChild(edit)
    card.appendChild(del)
    col.appendChild(card)
    row.prepend(col)
  });
}

//DELETE request 
class RequestDelete {
  async  delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return "Delete successful";
  }
}


function deleteBook() {
  const id = event.target.parentNode.getAttribute('data-id')
  const req = new RequestDelete();
  req.delete(`http://localhost:3000/api/books/${id}`)
    .then(message => console.log(message))
    .catch(err => console.log(err));
}


class RequestPut {
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response)
        .catch(err => reject(err));
    })
  }
}


function editBook() {
  event.preventDefault();
  const form = document.querySelector('form')
  let formData = new FormData(form);
  data = {
     "name": formData.get('title'),
     "author": formData.get('author'),
     "year": formData.get('year')
  }

  id = form.getAttribute('data-id')

  console.log(data)
const req = new RequestPut();
req.put(`http://localhost:3000/api/books/${id}`, data)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

//POST request 
class RequestPost {
  post(url, data) {
    let postObj = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
    return new Promise((resolve, reject) => {
      fetch(url, postObj)
        .then(response => response)
        .catch(err => reject(err));
    })
  }
}

function addBook() {
  const title = document.querySelector('input[name=addTitle]').value
  const author = document.querySelector('input[name=addAuthor]').value
  const year = document.querySelector('input[name=addYear]').value
  const req = new RequestPost();
  req.post(`http://localhost:3000/api/books`, { name: title, author: author, year: year })
    .then(message => console.log(message))
    .catch(err => console.log(err));
}

function showInput() {
  const displayInputs = document.querySelector('.container').style
  if (displayInputs.display == 'none' || displayInputs.display == '') {
    displayInputs.display = 'block'
  }
  else {
    addBook()
  }
}
const modal = document.querySelector('.modal-overlay').style
function showModal() {

  const form = document.querySelector('form')
  id = event.target.parentNode.getAttribute('data-id')
  form.setAttribute("data-id", id )

  const childNodes = event.target.parentElement.childNodes
  const title = document.querySelector('input[name=title]')
  const author = document.querySelector('input[name=author]')
  const year = document.querySelector('input[name=year]')
  


  title.value = childNodes[0].innerText
  author.value= (childNodes[1].innerText).split(':')[1]
  year.value = parseInt((childNodes[2].innerText).split(':')[1])
  console.log(childNodes)
  console.log(year.value)
  modal.display = 'block'
}

function closeModal() {
  event.preventDefault();
  modal.display = 'none'
}

