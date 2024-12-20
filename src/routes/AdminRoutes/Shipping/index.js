const express = require('express');
const router = express.Router();
const { ShippingController } = require('../../../controller');
const { authJwt } = require("../../../middleware");

router.post('/create', ShippingController.createShipping);
 
router.get('/get',[authJwt.verifyToken], ShippingController.getAllShipping);
// get applied job offers
router.get('/get/:id',[authJwt.verifyToken], ShippingController.getShippingById);
router.delete('/delete-shipping/:id',[authJwt.verifyToken], ShippingController.deleteShipping);

 
module.exports = router;