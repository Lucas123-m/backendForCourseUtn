const { parse } = require("csv-parse")
const fs = require("fs")

exports.readCSV = async (path)=>{
    fs.createReadStream(path)
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
      console.log("info:",row);
    })
    fs.unlink(path)
}

