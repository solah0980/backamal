const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const con = require('./config/config')
const cors = require('cors')
const port = process.env.POTT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

con.connect((err)=>{
    if(err) throw err
    console.log("connect database success")
})

require('./route')(app)
app.listen(port,(req,res)=>{
    console.log('server open success')
})