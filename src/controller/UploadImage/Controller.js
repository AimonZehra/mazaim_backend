const { successResponse, errorResponse } = require('../../helper');
const path = require('path');
const jwt = require('jsonwebtoken');

function SaveFile(file, path) {
  return new Promise((resolve, reject) => {
      // if file exists already
      file.mv(path, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(true);
          }
      });
  });
}
const UploadImageController = {

   
  uploadImages: async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({
          status: false,
          message: "No files were uploaded."
        });
      }
  
      const file = req.files.file;
      const extension = path.extname(file.name);
      const name = `${Date.now()}${extension}`;
      const filePath = `/public/image/${name}`;
      await SaveFile(file, process.cwd() + filePath);

      res.status(200).json({
        status: true,
        // message: "Image uploaded successfully",
        data: {
          path: filePath,
          name: name,
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: "Internal server error"
      });
    }
  },



};
module.exports = UploadImageController; 