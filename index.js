const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(express.json())

let books =
    [
        { name: 'something', id: 1, author: 'mamta', cost: 300 },
        { name: 'something', id: 2, author: 'sps', cost: 300 },
        { name: 'something', id: 3, author: 'usha', cost: 300 },
        { name: 'something', id: 4, author: 'dhas', cost: 300 },
        { name: 'something', id: 5, author: 'govind', cost: 300 },
        { name: 'something', id: 6, author: 'shruti', cost: 300 },
    ];

app.get('/', (req, res) => {
    res.send('Hello World!!!!!');
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.post('/api/books', (req, res) => {
    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('Name is required with a minimum of 3 characters')
        return
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    }
    books.push(book)
    res.send(book)
})


app.get('/api/books/:id', (req, res) => {
    const book = books.find(element => element.id === parseInt(req.params.id))
    if (!book) return res.status(404).send('Book not found')
    res.send(book)
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

app.put('/api/books/:id', (req, res) => {
    const book = books.find(element => element.id === parseInt(req.params.id))
    if (!book) return res.status(404).send('Book not found')

    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('Name is required with a minimum of 3 characters')
        return
    }

    book.name = req.body.name
    res.send(book)
})


app.delete('/api/books/:id', (req, res) => {
    const book = books.find(element => element.id === parseInt(req.params.id))
    if (!book) return res.status(404).send('Book not found')

    const index = books.indexOf(book)
    books.splice(index, 1)

    res.send(books)
})


