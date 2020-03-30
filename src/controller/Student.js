const db = require('../config/config')
let bcrypt = require('bcrypt')
module.exports = {
    Register(req,res){
        let{email,password,name,lastname,stdclass,sex,type}=req.body
        console.log(req)
        password = bcrypt.hashSync(password,10)
        try{
            db.run(`INSERT INTO student(email,password,name,lastname,stdclass,sex,type)
            VALUES("${email}","${password}","${name}","${lastname}"
            ,"${stdclass}","${sex}","${type}") `,
            (err,result)=>{
                if(err){
                    return res.send({error:"อีเมล์นี้มีผู้ใช้งานแล้ว"})
                }
                res.send("สมัครสมาชิกสำเร็จ")
            })
        }catch(err){
            res.send({error:"สมัครสมาชิกไม่สำเร็จ"})
        }
    },

    Show(req,res){
        let stdId = req.params.stdId
        try{
            con.query(`SELECT * FROM student WHERE studentId = ${stdId}`,(err,result)=>{
                let data = result.pop()
                if(err){
                    return res.send({error:"ไม่เจอ User"})
                }
                res.send(data)
            })
        }catch(err){
            res.send({error:"Error"})
        }
    }
}