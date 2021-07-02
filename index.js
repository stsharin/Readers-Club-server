const express = require('express')
const app = express()

const port = 5000

app.get('/', (req, res) => {
  res.send('Hey there! its the server.')
})

app.listen(port)