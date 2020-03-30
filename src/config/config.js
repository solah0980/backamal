const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('../myapp.sqlite',sqlite.OPEN_READWRITE,(err)=>{
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