const express = require('express');
const router = express.Router();
const {UploadImageController} = require('../../controller');
const { authJwt } = require("../../middleware");


router.post('/upload-image',[authJwt.verifyToken],UploadImageController.uploadImages);

module.exports = router;