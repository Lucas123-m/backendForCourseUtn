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
        a.review,
        a.imgSrc
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
        a.review,
        a.imgSrc
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

exports.addAnime = async ({title,seasons,chapters,author,watch_status,description,review,imgSrc})=>{
    const rows = await pool.query(`
        insert into anime_series (title,seasons,chapters,author,watch_status,description,review,imgSrc)
        values (?,?,?,?,?,?,?,?)        
    `,
    [title,seasons,chapters,author,watch_status,description,review,imgSrc]
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

exports.updateAnime = async(id,{title,seasons,chapters,author,watch_status,description,review,imgSrc}) => {
    let query = `
    update anime_series 
    set title = ?,
    seasons = ?,
    chapters = ?,
    author = ?,
    watch_status = ?`
    let parameters = [title,seasons,chapters,author,watch_status]

    if (description || description === null){
        query += `,\n    description = ?`
        parameters = parameters.concat(description)
    }
    if (review || review === null){
        query += `,\n    review = ?`
        parameters = parameters.concat(review)
    }
    if (imgSrc || imgSrc === null){
        query += `,\n    review = ?`
        parameters = parameters.concat(imgSrc)
    }
    query += `\n    where id = ?`
    parameters = parameters.concat(id)
    const rows = await pool.query(query,parameters)
    return rows
}

exports.updateContent = async(id,{id_serie,title,type,watch_order,chapters,watch_status,review,duration}) => {
    let query = `
    update anime_content 
    set id_serie = ?,
    title = ?,
    type = ?,
    watch_order = ?,
    watch_status = ?,
    duration = ?`
    let parameters = [id_serie,title,type,watch_order,watch_status,duration]

    if (chapters || chapters === null){
        query += `,\n    chapters = ?`
        parameters = parameters.concat(chapters)
    }
    if (review || review === null){
        query += `,\n    review = ?`
        parameters = parameters.concat(review)
    }
    query += `\n    where id = ?`
    parameters = parameters.concat(id)
    const rows = await pool.query(query,parameters)
    return rows
}


