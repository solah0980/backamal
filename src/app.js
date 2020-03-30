const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

require('./config/config')
require('./route')(app)

app.listen(port,(req,res)=>{
    console.log(`server open success ${port}`)
    console.log("let's go")
})