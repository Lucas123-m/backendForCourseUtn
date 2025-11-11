const pool = require("../config/db")

exports.getUser = async({username})=>{
    const rows = pool.query(`SELECT a.id,a.username,a.pwd FROM users a WHERE a.username = ?`,[username])
    return rows
}

exports.register = async({username,pwd})=>{
    const rows = pool.query(`INSERT INTO users (username,pwd) VALUES (?,?)`,[username,pwd])
    return rows
}