const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();

// port
const port = 5000

// middle wares
app.use(cors())
app.use(express.json())

// db details and connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mps7w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookCollection = client.db("bookShop").collection("books");
    const buyerCollection = client.db("bookShop").collection("buyers");

    // default api
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

    // all book and buyer details for ADMIN
    app.get('/customerDetails', (req, res) => {
        buyerCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // checkout list for specific users
    app.get('/customerDetails/:email', (req, res) => {
        const email = req.params.email;
        buyerCollection.find({email: email})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // add more books
    app.get('/addBooks', (req, res) => {
        bookCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // only using this api to add books - fakeData
    // app.post('/addBooks', (req, res) => {
    //     const books = req.body;
    //     bookCollection.insertMany(books, (err, result) => {
    //         console.log(err, result);
    //         res.send({count: result})
    //     })
    // })


});

app.listen(port)