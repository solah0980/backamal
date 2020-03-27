const con = require('../config/config')
const dateFormat = require('dateformat');
const now = new Date();
const da = dateFormat(now, "mediumDate");
const name1 = ["มัฆริบ", "อิชาอฺ", "ศุบฮฺ", "ซุฮฺริ", "อัศรี"]
const name2 = ["ละหมาดซุนนะฮฺ", "ละหมาดฏูฮา", "ละหมาดในยาค่ำคืน", ]
const name3 = ["อ่านอัลกุรอาน", "อ่านอัซการ", "ศอดาเกาะฮฺ", "ถือศีลอด", "ขอดุอาฮฺ", "ศอดาเกาะฮฺ"]
let dataSuccess = [] //ตัวแปรไว้เก็บข้อมูลที่ถูกประมวลผลเสร็จแล้ว

//เพิ่มข้อมูล ละหมาด,ละหมาดซุนนะ,อีบาดัร
async function addData(id, pray, praysunnah, ebadat) {
    let p1 = new Promise((resove,reject)=>{
        for (let i = 0; i < 5; i++) {
             con.query(`INSERT INTO pray(amalId,name,point) VALUES("${id}","${pray[i].name}",${parseInt(pray[i].point)})`, (err, result) => {})
        } 
    },1000)
    
    let p2 = new Promise((resove,reject)=>{
         for (let i = 0; i < 3; i++) {
        con.query(`INSERT INTO praysunnah(amalId,name,point) VALUES("${id}","${praysunnah[i].name}",
             ${parseInt(praysunnah[i].point)})`, (err, result) => {})
    }
    },1000)

    let p3 =new Promise((resove,reject)=>{
       for (let i = 0; i < 6; i++) {
           con.query(`INSERT INTO ebadat(amalId,name,point) VALUES("${id}","${ebadat[i].name}",
             ${parseInt(ebadat[i].point)})`, (err, result) => {})
       }
   },1000)
    
   p1.then(()=>p2.then(()=>p3)).catch((err)=>console.log(err))
}

//คำนวนเปอร์เซ็นการ ละหมาด,ละหมาดซุนนะฮ์,อีบาดัร
function CalculateData(name, data, max) {
    let sum = null
    name.forEach((n) => { //นำตัวแปรที่ได้ set ไว้ นำไปวนลูปหาค่าที่ตรงกันในข้อมูล data
        let d = {}
        sum=0
        data.forEach((n1) => {
            if (n1.name === n) {
                sum = sum + n1.point //ผลรวมคะแนนของแต่ละวักตู
            }
        })
        d = {
            data: sum * 100 / max, //หาเปอร์เซนต์การละหมาดในแต่ละวักตู
            name: n
        }
        dataSuccess.push(d) //เพิ่มค่าที่หาเปอร์เซ็นไปยังตัวแปร dataSuccess เพื่อส่งไปให้ user ต่อไป
    })

}

//query ข้อมูลจากฐานข้อมูล
function queryData(name, table, sum, type, res,th, f, l) {
    //มีอยู่สองเงื่อนไข ถ้า type == 1 คือมีข้อมูลเดี่ยวทำเงื่อนไขแรก //ถ้า type ==2 มีข้อมูลหลายแถวทำแถวที่2
    if (type == 0) {
        con.query(`SELECT name,point FROM ${table} WHERE amalId = ${f.amalId}`, (err, result) => {
            CalculateData(name, JSON.parse(JSON.stringify(result)), sum)
            dataSuccess.push(th)
            res.send(dataSuccess)
            dataSuccess = []
        })
    } else if (type == 1) {
        con.query(`SELECT name,point FROM ${table} WHERE amalId BETWEEN ${f.amalId} AND ${l.amalId}`, (err, result) => {
            CalculateData(name, JSON.parse(JSON.stringify(result)), sum)
            dataSuccess.push(th)
            res.send(dataSuccess)
            dataSuccess = []
        })
    }

}

module.exports = {

    //บันทึกอามัลลงในฐานข้อมูล
    async saveAmal(req, res) {
        try {
            con.query(`INSERT INTO myamal(studentId,date) VALUES("${req.body.stdId}","${da}")`, (err, result) => {
                addData(result.insertId, req.body.pray, req.body.praysunnah, req.body.ebadat)
                res.send("Success")
            })
        } catch (err) {
            console.log(err)
        }
    },

    //ส่งข้อมูลอีบาดัรไปให้ user
    async showAmal(req, res) {
        try {
            con.query(`SELECT amalId FROM myamal WHERE studentId = ${req.body.stdId} AND date LIKE "${req.body.month}%"`, (err, result) => {

                if (Object.keys(result).length === 0) {
                    return res.send({
                        error: "ไม่เจอข้อมูล"
                    })
                }
                let allValues = JSON.parse(JSON.stringify(result))
                let th = Object.keys(allValues).length  //จำนวนการทำอีบาดัร
                let sum = Object.keys(allValues).length //เก็บจำนวนข้อมูลในแต่ละเดือน
                sum = sum * 70 //จำนวนคะแนนเต็มทั้งหมด         

                //เงื่อนไขในการ query ข้อมูล หากมีข้อมูลเดียวทำเงื่อนไข1 หากมีหลายข้อมูลทำเงื่อนไขที่2
                if (Object.keys(allValues).length === 1) {
                    let f = result.pop()
                    if (req.body.type == 0) queryData(name1, "pray", sum, 0, res,th, f)
                    else if (req.body.type == 1) queryData(name2, "praysunnah", sum, 0, res,th, f)
                    else if (req.body.type == 2) queryData(name3, "ebadat", sum, 0, res,th, f)
                } else {
                    let f = result.shift()
                    let l = result.pop()
                    if (req.body.type == 0) queryData(name1, "pray", sum, 1, res,th, f, l)
                    else if (req.body.type == 1) queryData(name2, "praysunnah", sum, 1, res,th, f, l)
                    else if (req.body.type == 2) queryData(name3, "ebadat", sum, 1, res,th, f, l)
                }

            })
        } catch (err) {
            console.log(err)
        }
    }

}