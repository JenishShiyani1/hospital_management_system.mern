const { v2 } = require('cloudinary');
const fs = require('fs');
       
v2.config({ 
  cloud_name: 'diu5dlcuq', 
  api_key: '768981158927262', 
  api_secret: 'jOxLiSYX7DUKxRhcxPNwwYyIwfs' 
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await v2.uploader.upload(localFilePath , {
            resource_type : "auto"
        })
        console.log("file is uploaded on cloudinary" , response.url);
        return response;
    } catch (error) { 
        fs.unlinkSync(localFilePath)
        return null;
    }
}

module.exports = uploadOnCloudinary