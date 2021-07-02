const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()

const port = 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mps7w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookCollection = client.db("bookShop").collection("books");

    app.get('/', (req, res) => {
        res.send('Hey there! its the server.')
    })

    // app.get('/addBooks', (req, res) => {
    //     bookCollection.insertMany([{ name: 'sharin' }, { name: 'tasnim' }], (err, result) => {
    //         console.log(err, result);
    //     })
    // })


});



app.listen(port)