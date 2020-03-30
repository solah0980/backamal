const db = require('./config/config')
const Student = require('./controller/Student')
const isAuthen = require('./controller/isAuthen')
const MyAmal = require('./controller/MyAmal')
let bcrypt = require('bcrypt')
module.exports =  (app)=>{
    app.post('/student/register',Student.Register)
    app.get('/student/:stdId',Student.Show)
    app.post('/login',isAuthen.Login)
    app.post('/myamal',MyAmal.saveAmal)
    app.post('/showamal',MyAmal.showAmal)

    app.get('/test',(req,res)=>{
        db.all(`SELECT * FROM myamal WHERE studentId = 8 AND date LIKE "Mar%"`,(err,result)=>{
            if(err) return console.log(err.message)
            console.log(result)
        })
    })
}