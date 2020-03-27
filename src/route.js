const con = require('./config/config')
const Student = require('./controller/Student')
const isAuthen = require('./controller/isAuthen')
const MyAmal = require('./controller/MyAmal')
let bcrypt = require('bcrypt')
module.exports =  (app)=>{
    app.post('/student/register',Student.Register)
    app.get('/student/:stdId',Student.Show)
    app.post('/login',isAuthen.Login)
    app.get('/test',(req,res)=>{
        console.log('hello')
        res.send("Hello Api")
    })

    app.post('/myamal',MyAmal.saveAmal)
    app.post('/showamal',MyAmal.showAmal)
}