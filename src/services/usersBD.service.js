const pool = require("../config/db")

exports.getUser = async({username})=>{
    const rows = pool.query(`SELECT a.id,a.username,a.pwd FROM users a WHERE a.username = ?`,[username])
    return rows
}

exports.getUserAndPermission = async({permission,username})=>{
    const rows = pool.query(`SELECT a.username,r.id_role,per.name FROM users a
    JOIN users_role r ON r.id_user = a.id
    JOIN permissions_role p ON r.id_role = p.id_role
    JOIN permissions per ON p.id_permission = per.id        
    WHERE per.name = ? AND a.username = ?`,[permission,username])
    return rows
}

exports.register = async({username,pwd})=>{
    const rows = pool.query(`INSERT INTO users (username,pwd) VALUES (?,?)`,[username,pwd])
    return rows
}