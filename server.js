const express = require('express')
const app = express()

const cors = require('cors');

app.use(cors());
const port = process.env.PORT || 3000

const fs = require('fs')
const rawdata = fs.readFileSync('books.json')
const books = JSON.parse(rawdata)

console.log(books)

app.use(express.json())

//Homepage
app.use(express.static('public'))

//Library Catalogue
app.get('/api/books', (req, res) => {
    res.send(books)
})

//Adding a new book
app.post('/api/books', (req, res) => {
    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('Name is required with a minimum of 3 characters')
        return
    }

    const book = {
        name: req.body.name,
        id: Date.now(),
        author: req.body.author,
        year: req.body.year
    }
    books.push(book)
    let data = JSON.stringify(books, null, 2);
    updateFile(data)
    res.send(book)
})

//Update a book
app.put('/api/books/:id', (req, res) => {
    const book = books.find(element => element.id === parseInt(req.params.id))
    if (!book) return res.status(404).send('Book not found')

    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('Name is required with a minimum of 3 characters')
        return
    }

    book.name = req.body.name
    let data = JSON.stringify(books, null, 2);
    updateFile(data)
    res.send(book)
})

//Delete a book
app.delete('/api/books/:id', (req, res) => {
    const book = books.find(element => element.id === parseInt(req.params.id))
    if (!book) return res.status(404).send('Book not found')

    const index = books.indexOf(book)
    books.splice(index, 1)
    let data = JSON.stringify(books, null, 2);
    updateFile(data)
    res.send(books)
})

//Searching for a book by id
app.get('/api/books/:id', (req, res) => {
    const book = books.find(element => element.id === parseInt(req.params.id))
    if (!book) return res.status(404).send('Book not found')
    res.send(book)
})

function updateFile(data) {
    fs.writeFile('books.json', data, (err) => {
        if (err) throw err;
        console.log('Data re-written to file');
    });
}

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))