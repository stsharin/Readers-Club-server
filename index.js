const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();

const port = 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mps7w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookCollection = client.db("bookShop").collection("books");

    app.get('/', (req, res) => {
        res.send('Hey there! its the server.')
    })

    // to get the book list from the server
    app.get('/books', (req, res) => {
        bookCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    // inserting many books
    // app.post('/addBooks', (req, res) => {
    //     const books = req.body;
    //     bookCollection.insertMany(books, (err, result) => {
    //         console.log(err, result);
    //         res.send({count: result})
    //     })
    // })


});

app.listen(port)