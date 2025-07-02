// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
require("dotenv").config()
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
exports.uploadImage = async (file) => {
  console.log("file en upload image service: ",file)
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
  console.log("respuesta:",uploadedImageUrl)
  return uploadedImageUrl
};

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};

exports.deleteImage = async (public_id)=>{
    const res = cloudinary.uploader.destroy(public_id)
    return res
}