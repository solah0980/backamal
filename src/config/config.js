const sqlite = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'myapp.sqlite')
let db = new sqlite.Database(dbPath,sqlite.OPEN_READWRITE,(err)=>{
        if(err){
                return console.log(err.message)
        }
        console.log('Connected sqlite success')
})

/*db.close((err)=>{
        if(err) return console.log(err.message)
        console.log("close db success")
})*/
module.exports = db