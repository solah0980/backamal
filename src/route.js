const db = require('./config/config')
const Student = require('./controller/Student')
const isAuthen = require('./controller/isAuthen')
const MyAmal = require('./controller/MyAmal')
/* let bcrypt = require('bcrypt') */
module.exports =  (app)=>{
    app.post('/student/register',(req,res)=>{
        Student.Register
    })
    app.get('/student/:stdId',(req,res)=>Student.Show)
    app.post('/login',(req,res)=>isAuthen.Login)
    app.post('/myamal',(req,res)=>MyAmal.saveAmal)
    app.post('/showamal',(req,res)=>MyAmal.showAmal)

    app.get('/test',(req,res)=>{
        res.send("test api")
    })
}