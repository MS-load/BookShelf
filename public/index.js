//The general GET request (all books)
class RequestGet {
  async get(url) {
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
}

function loadBooks() {
  const req = new RequestGet();
  req.get('http://localhost:3000/api/books/')
    .then(data => {
      printBooks(data)
    })
    .catch(err => console.log(err));
}

//Rendering all books
function printBooks(data) {
  const row = document.querySelector('.row')
  data.forEach(element => {
    const card = printSingleBook(element)
    row.prepend(card)
  });
}

function printSingleBook(element) {
  const card = document.createElement('div')
  card.classList.add("card")
  card.setAttribute("data-id", element.id)
  card.innerHTML = `
                <h4>${element.name}</h4>
                <p>author: ${element.author}</p>
                <p>year: ${element.year}</p>
                <span class="material-icons" onclick = "showModal()">create</span>
                <span class="material-icons" onclick = "deleteBook()">delete</span>
                `
  return card
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
  console.log(id)
  const req = new RequestDelete();
  req.delete(`http://localhost:3000/api/books/${id}`)
    .then(message => console.log(message))
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

//UPDATE request 
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
  event.preventDefault()
  const form = document.querySelectorAll('form')[1]
  let formData = new FormData(form);
  data = {
    "name": formData.get('title'),
    "author": formData.get('author'),
    "year": formData.get('year')
  }

  const id = form.getAttribute('data-id')
  console.log(data)
  const req = new RequestPut();
  req.put(`http://localhost:3000/api/books/${id}`, data)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function showModal() {
  const modal = document.querySelector('.modal-overlay').style
  const form = document.querySelectorAll('form')[1]
  const id = event.target.parentNode.getAttribute('data-id')
  form.setAttribute("data-id", id)

  const childNodes = event.target.parentElement.childNodes
  const title = document.querySelector('input[name=title]')
  const author = document.querySelector('input[name=author]')
  const year = document.querySelector('input[name=year]')

  title.value = childNodes[1].innerText
  author.value = (childNodes[3].innerText).split(':')[1]
  year.value = parseInt((childNodes[5].innerText).split(':')[1])
  console.log(childNodes)
  console.log(year.value)
  modal.display = 'block'
}

function closeModal() {
  event.preventDefault();
  const modal = document.querySelector('.modal-overlay').style
  modal.display = 'none'
}

//Search a book
function searchBook() {
  event.preventDefault()
  title = document.querySelector('input[name=search]').value
  const req = new RequestGet();
  req.get(`http://localhost:3000/api/books/${title}`)
    .then(data => {
      const allBooks = document.querySelectorAll(`[data-id]`)
      const reqBook = document.querySelector(`[data-id="${data.id}"]`)
      const home = document.querySelector('.home')
      const search = document.querySelector('.search')
      search.style.display = "none"
      home.style.display = 'block'
      allBooks.forEach(element => {
        if (reqBook) {
          if (element !== reqBook) {
            element.style.display = 'none'
          }
        }
        else {
          document.body.innerHTML = '<h4>BOOK NOT FOUND</h4>'
        }
      })
    })
    .catch(err => console.log(err));
  document.querySelector('input[name=search]').value = ''
}

function showAll() {
  resetStyle = document.querySelectorAll('[data-id],.search')
  const home = document.querySelector('.home')
  home.style.display = 'none'
  console.log(resetStyle)
  resetStyle.forEach(element => {
    element.style.display = 'unset'
  });
}
window.addEventListener('load', loadBooks())