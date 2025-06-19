const pool = require("../config/db")

exports.getAllAnimes = async() =>{
    const [rows] = await pool.query(`
        SELECT
        a.id,
        a.title,
        a.seasons,
        a.chapters,
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
        a.id,
        b.title as title_serie,
        a.title as title_cotent,
        a.type,
        a.watch_order,
        a.chapters,
        a.review,
        a.duration
        FROM anime_content a
        LEFT JOIN anime_series b ON a.id_serie = b.id   
    `);
    return rows;
}

exports.getAnime = async (id) => {
    const [row] = await pool.query(`
        SELECT
        a.id,
        a.title,
        a.seasons,
        a.chapters,
        a.author,
        a.watch_status,
        a.description,
        a.review
        FROM anime_series a  
        WHERE a.id = ?
    `,
     [id]
    )
    return row
}

exports.getAnimeContent = async (id) => {
    const [row] = await pool.query(`
        SELECT
        a.id,
        b.title as title_serie,
        a.title as title_cotent,
        a.type,
        a.watch_order,
        a.chapters,
        a.review,
        a.duration
        FROM anime_content a
        LEFT JOIN anime_series b ON b.id = a.id_serie  
        WHERE a.id = ?
    `,
     [id]
    )
    return row
}

exports.addAnime = async ({title,seasons,chapters,author,watch_status,description,review})=>{
    const rows = await pool.query(`
        insert into anime_series (title,seasons,chapters,author,watch_status,description,review)
        values (?,?,?,?,?,?,?)        
    `,
    [title,seasons,chapters,author,watch_status,description,review]
    );
    return rows
}

exports.addAnimeContent = async ({id_serie,title,type,watch_order,chapters,watch_status,review,duration})=>{
    const rows = await pool.query(`
        INSERT INTO anime_content (id_serie,title,type,watch_order,chapters,watch_status,review,duration)
        VALUES(?,?,?,?,?,?,?,?)       
    `,
    [id_serie,title,type,watch_order,chapters,watch_status,review,duration]
    );
    return rows
}

exports.removeAnime = async(id) => {
    const rows = await pool.query(`delete from anime_series where id = ?`,[id])
    return rows
}

exports.removeContent = async(id) => {
    const rows = await pool.query(`update anime_content set where id = ?`,[id])
    return rows
}

exports.updateAnime = async(id,{title,seasons,chapters,author,watch_status,description,review}) => {
    const rows = await pool.query(`delete from anime_content where id = ?`,[id])
    return rows
}


exports.updateContent = async(id,{id_serie,title,type,watch_order,chapters,watch_status,review,duration}) => {
    console.log(id)
    const rows = await pool.query(`delete from anime_content where id = ?`,[id])
    return rows
}

