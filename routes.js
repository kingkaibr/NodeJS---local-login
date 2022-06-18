module.exports = function(app){

var path = require ('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cidadesRS = require('./cidadesRS')


const user = [{username: 'admin', password: '123'}]
var name1 =''
var adress1=''
var city1 = ''
var birthdate1 =''


app.use(session({
    secret:'dsjafjhsdahkfgh2k34g3h2k123jkhkfdsakljh1231___55544451dsa'
}))
app.use(bodyParser.urlencoded({extended: true}))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))


app.post('/', (req,res) =>{
    res.render('home')
})

app.post('/signout', (req, res) =>{
    req.session.login = ''
    res.redirect('/')  
})

app.get('/signin', (req, res) =>{
    res.render('login')
})

app.post('/signin', (req, res) => {
    if(req.body.password == user[0].password && req.body.username == user[0].username){
        req.session.login = user[0].username
        res.render('autocadastro', {login: user[0].username})
    }else{
        res.status(204).send();
    }
})

app.post('/validation', (req, res) => {
    if(req.body.password != user[0].password || req.body.username != user[0].username){
        res.writeHead(400); 
        res.end();
    }
})

app.get('/cidadesRS', (req, res) => {
    res.send(cidadesRS)
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/home', (req, res) => {
    name1 = req.body.name 
    adress1 = req.body.adress
    city1 = req.body.city
    birthdate1 = req.body.birthdate
    res.render('home', {login: user[0].username, name: name1, adress: adress1, city: city1, birthdate: birthdate1})
    
})
}