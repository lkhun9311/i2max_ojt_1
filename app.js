const express = require('express')
const app = express()

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/try', (req, res) => {
    res.send('<h1>Try Page</h1>')
})

app.listen(8080, () => {
    console.log('success')
})