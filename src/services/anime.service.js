const pool = require("../config/db")

exports.getAllAnimes = async() =>{
    const [rows] = await pool.query(`
        SELECT
        a.title,
        a.seasons,
        a.author,
        a.watch_status,
        a.description,
        a.review
        FROM anime_series a      
    `);
    return rows;
}

exports.getAllContent = async () => {
    const [rows] = await pool.query(`
        SELECT 
        a.serie,
        a.title,
        a.type,
        a.watch_order,
        a.chapters,
        a.review,
        a.duration
        FROM anime_content a   
    `);
    return rows;
}

exports.getAnime = async (title) => {
    const [row] = await pool.query(`
        SELECT
        a.title,
        a.seasons,
        a.author,
        a.watch_status,
        a.description,
        a.review
        FROM anime_series a  
        WHERE a.title = ?
    `,
     [title]
    )
    return row
}