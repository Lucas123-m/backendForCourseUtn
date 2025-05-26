const mysql2 = require("mysql2/promise")

async function connectDb(){
    const conn = await mysql2.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"ANIMES_PROYECT",
    })
    const res = await conn.query("SELECT * from anime_series")
    console.log(res)

    conn.end()
}

module.exports = connectDb

