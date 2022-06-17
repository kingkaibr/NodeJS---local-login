const express = require('express')
const port = 3000
const app = express()

var path = require ('path')

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

require('./routes')(app);

app.listen(port, ()=> {
    console.log('servidor rodando na porta', port)
})