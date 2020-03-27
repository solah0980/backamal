const con = require('../config/config')
let bcrypt =require('bcrypt')
let jwt = require('jsonwebtoken')

function getToken(user){
    return jwt.sign(user,'solah',{expiresIn:60*60*24*7})
}
module.exports={
    Login(req,res){
        let{email,password}=req.body
        
        try{
             con.query(`SELECT * FROM student WHERE email = "${email}"`,(err,result)=>{
                let dataSend = null 
                let data = result.pop()
                let enpass = null
                if(err || data===undefined){
                    return res.send({error:"อีเมล์ไม่ถูกต้อง"})
                }
                enpass = bcrypt.compareSync(password,data.password)
                if(!enpass){
                    return res.send({error:"รหัสผ่านไม่ถูกต้อง"})
                }
                dataSend={
                    stdId:data.studentId,
                    name:data.name,
                    lastname:data.lastname,
                    stdclass:data.stdclass,
                    sex:data.sex,
                    email:data.email,
                    type:data.type
                }
                console.log(dataSend)
                res.send({
                    user:dataSend,
                    token:getToken(dataSend)
                })
            
        })
        }catch(err){
            console.log("Errror")
        }
       
    }
}