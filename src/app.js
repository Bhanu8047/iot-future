const http = require('http')
const express = require('express')
require('./db/db')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('hbs')
const {router , allAppliances} = require('./routes/appliances')

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './templates/views'))
hbs.registerPartials(path.join(__dirname, './templates/partials'))


app.get('', (req, res) => {
    res.render('index',{
        name: 'Dedicated Moron',
        type: 'Bob the Body Builder'
    })
})
app.get('/new', (req, res) => {
    res.render('addAppliances', {

    })
})

app.get('/listAll', async(req, res) => {
    const all = await allAppliances()
    res.render('listAll', {
        all
    })
})

var led = false

app.post('/led', async(req, res) => {
    res.set('Content-Type', 'text/plain')
    led = !led
    res.send({
        value: led
    })
    
})

app.get('/led', async(req, res) => {
    res.set('Content-Type', 'text/plain')
    if(led){
        return res.send({
            value: 1
        })
    } else {
        return res.send({
            value: 0
        })
    }
})

app.get('/faceRecognition', async(req, res) => {
   res.render('faceCam',{

   })
})

app.use(router)

const server = http.createServer(app)

server.listen(3000, () => {
    console.log(`Server is on port 3000.`)
})
