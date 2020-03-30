const db = require('../config/config')
let bcrypt =require('bcrypt')
let jwt = require('jsonwebtoken')

function getToken(user){
    return jwt.sign(user,'solah',{expiresIn:60*60*24*7})
}
module.exports={
    Login(req,res){
        let{email,password}=req.body
        
        try{
             db.get(`SELECT * FROM student WHERE email = "${email}"`,(err,result)=>{
                if(err){
                    return res.send({error:"อีเมล์ไม่ถูกต้อง"})
                }
                enpass = bcrypt.compareSync(password,result.password)
                if(!enpass){
                    return res.send({error:"รหัสผ่านไม่ถูกต้อง"})
                }
                res.send({
                    user:result,
                    token:getToken(result)
                })
            
        })
        }catch(err){
            console.log("Errror")
        }
       
    }
}