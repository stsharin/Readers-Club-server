const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const ObjectId = require('mongodb').ObjectId

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
    const orderCollection = client.db("bookShop").collection("orders");

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

    // for specific users
    app.get('/books/:id', (req, res) => {
        const id = req.params.id;
        bookCollection.find({_id: ObjectId(id)})
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })

    // order details
    app.post('/addOrder', (req, res) => {
        const order = req.body;
        orderCollection.insertOne(order, (err, result) => {
            res.send({count: result})
        })
    })

    // all order details
    app.get('/orders', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // order details for specific user
    app.get('/order/:email', (req, res) => {
        const email = req.params.email;
        orderCollection.find({email: email})
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