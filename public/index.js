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
  data.forEach(element => {
    const row = document.querySelector('.row')
    const col = document.createElement('div')
    col.classList.add("column")
    const card = document.createElement('div')
    card.classList.add("card")
    card.setAttribute("data-id", element.id)
    const title = document.createElement('h4')
    const text = document.createElement('p')
    const del = document.createElement('button')
    del.innerHTML = `Delete`
    del.onclick = deleteBook
    title.innerHTML = element.name
    text.innerHTML = `author: ${element.author} <br/> year: ${element.year}`
    card.appendChild(title)
    card.appendChild(text)
    card.appendChild(del)
    col.appendChild(card)
    row.appendChild(col)
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

//POST request 
class RequestPost {
  post(url,data){
		let postObj = {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
		}
		return new Promise((resolve, reject) => {
			fetch(url, postObj)
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(err => reject(err));
			})
	}
}

function addBook() {
  const title = document.querySelector('input[name=title]').value
  const author = document.querySelector('input[name=author]').value
  const year = document.querySelector('input[name=year]').value
  const req = new RequestPost();
  req.post(`http://localhost:3000/api/books`, { name: title, author: author, year: year })
    .then(message => console.log(message))
    .catch(err => console.log(err));
}
