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