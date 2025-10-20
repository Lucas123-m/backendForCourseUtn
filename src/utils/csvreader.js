//const { parse } = require("csv-parse")
const csvParser = require("csv-parser")
const fs = require("fs")

exports.readCSV = async (path)=>{
  return new Promise((resolve,reject)=>{
    const csvData = {data:[],info:[],titulos:[]}
    var line1 = true
    //.pipe(parse({delimiter: "\n\n",from_line:1}))
    //readStream.pipe(csvParser()) //otra opcion, genera objetos
    fs.createReadStream(path,'utf-8')
    .pipe(csvParser())
    .on("data", (row) => {
      csvData.data.push(row)
    })
    
    .on('end', () => {
      fs.unlink(path, (err) => {
          csvData.info.push(`Error while closing: ${err}.${csvData.length} records read.`)
          reject(csvData)  
      })
      csvData.info.push(`File closed and processed. ${csvData.data.length} records read.`)
      resolve(csvData)
    })
    .on('error', (err) => {
      fs.unlink(req.file.path, (errUnlink) => {
            csvData.info.push(`General error: ${err} and error while closing the file: ${errUnlink}}`)
            reject(csvData)  
      })
      csvData.info.push(`General error: ${err}.The file was closed correctly.`) 
      reject(csvData)
    })
  })
}

