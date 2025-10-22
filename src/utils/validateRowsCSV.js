//const serie = require("../schemas/serie")

exports.validateRow = (row,schema)=>{
    const data= row
    //normalizo si no se importan valores en csv.
    for (const key in data){
        if(data[key]===''){
            delete data[key]
        }
    }
    console.log("schema:",schema)
    const result = schema.safeParse(row)
    if(!result.success){
        return {success:false, error:result.error.issues} //issues print prettier in response!  
    }
    return {success:true}
}

exports.validateID = (row)=>{
    const data= row
    //normalizo si no se importan valores en csv.
    for (const key in data){
        if(data[key]===''){
            delete data[key]
        }
    }
    console.log("schema:",schema)
    const result = schema.safeParse(row)
    if(!result.success){
        return {success:false, error:result.error.issues} //issues print prettier in response!  
    }
    return {success:true}
}
