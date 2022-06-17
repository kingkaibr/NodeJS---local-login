module.exports = function(app){

var path = require ('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const user = [{username: 'admin', password: '123'}]

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
    if(req.body.password != user[0].password && req.body.username != user[0].username){
        res.writeHead(400); 
        res.end();
    }
})

app.get('/', (req, res)=>{
    if(req.session.login){
        res.render('logado', {login: user[0].username})
    }else{
        res.render('home')
    }
})
}