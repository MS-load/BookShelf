fetch('http://localhost:3000/api/books/')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    printBooks(data)
  })
  .catch(error => console.error(error))

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

class RequestDelete {
  async  delete ( url ) {
    const response = await fetch(url, {
      method: 'DELETE',
    } );
		return  "Operation successful" ;
  }
}

function deleteBook() {
  const id = event.target.parentNode.getAttribute('data-id')
  const req= new RequestDelete();
  req.delete(`http://localhost:3000/api/books/${id}`)
  .then(message => console.log(message))
  .catch(err => console.log(err));
}

// getDevices = async () => {
//     const location = window.location.hostname;
//     const settings = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         }
//     };
//     try {
//         const fetchResponse = await fetch(`http://${location}:9000/api/sensors/`, settings);
//         const data = await fetchResponse.json();
//         return data;
//     } catch (e) {
//         return e;
//     }    

// }