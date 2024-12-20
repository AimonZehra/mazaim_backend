const express = require('express');
const router = express.Router();
const { BannerController } = require('../../../controller');
const { authJwt } = require("../../../middleware");

router.post('/add',[authJwt.verifyToken], BannerController.AddBanner);

router.post('/update',[authJwt.verifyToken], BannerController.updateBanner);
 
router.get('/get', BannerController.getBanners);

 
module.exports = router;