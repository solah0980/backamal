const sql = require('mysql')

const con = sql.createConnection({
        host: 'us-cdbr-iron-east-01.cleardb.net',
        user: 'b66fc7e737a9b8',
        password: 'cdd4b129',
        database: 'heroku_affeff97f86f978',
})

module.exports = con