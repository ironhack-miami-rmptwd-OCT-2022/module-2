const cloudinaryPKG = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinaryPKG.config({
    cloud_name: "dacloudycloud",
    api_key: "479499291438833",
    api_secret: "_GkFf1InS2VRjfe8Uxw1-zZt9yE"
  });


  var storageOBJ = new CloudinaryStorage({
    cloudinary: cloudinaryPKG,
    params: {
      folder: 'bucket2',
      format: async (req, file) =>'jpeg' || 'png' || 'jpg', // supports promises as well
      public_id: (req, file) => file.originalname,
    },
  });


  const uploadCloud = multer({ storage: storageOBJ });
  
  module.exports = uploadCloud;
