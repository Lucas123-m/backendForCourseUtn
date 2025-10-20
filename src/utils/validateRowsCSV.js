const serie = require("../schemas/serie")

exports.validateRow = (row)=>{
    const data= row
    //normalizo si no se importan valores en csv.
    for (const key in data){
        if(data[key]===''){
            delete data[key]
        }
    }
    const result = serie.serieSchema.safeParse(row)
    if(!result.success){
        return {success:false, error:result.error.issues} //issues print prettier in response!  
    }
    return {success:true}
}
