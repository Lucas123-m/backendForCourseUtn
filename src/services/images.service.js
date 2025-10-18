// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
require("dotenv").config()
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});
// Log the configuration
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
exports.uploadImage = async (file) => {
  const formImg = new FormData()
  const cloud_name = process.env.CLOUD_NAME
  const url_post = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
  const preset_name = process.env.PRESET_NAME

  const fileBase64 = file.buffer.toString('base64');
  const dataUri = `data:${file.mimetype};base64,${fileBase64}`;
  formImg.append("file",dataUri)
  formImg.append("upload_preset",preset_name)
  formImg.append("cloud_name",cloud_name)
  const responseImg = await fetch(url_post,{method:"POST",body: formImg})
  const uploadedImageUrl = await responseImg.json()
  return uploadedImageUrl
};

exports.deleteRemoteImage = async (public_id)=>{
  try{
    const res = cloudinary.uploader.destroy(public_id)
    return res
  } catch {
    return {error: "Error en el borrado de la imagen en cloudinary."}
  }
    
}

exports.getAllRemoteImages = async () =>{
  var result = {}
  const getImages = async () =>{
    return cloudinary.search.sort_by('public_id','desc').max_results(30).execute().then(result=>result);
  }
  result = await getImages()
  result = result?.resources
  
  return result
}