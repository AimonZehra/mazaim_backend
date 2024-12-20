const express = require('express');
const router = express.Router();
const {ProductController} = require('../../../controller');
const { authJwt } = require("../../../middleware");

router.post('/create',[authJwt.verifyToken], ProductController.createProduct);
 
router.get('/get', ProductController.getAllProducts);
// get applied job offers
router.get('/get/:id', ProductController.getProductById);
router.post('/update/:id',[authJwt.verifyToken], ProductController.updateProduct);
router.delete('/delete/:id',[authJwt.verifyToken], ProductController.deleteProduct);
router.post('/coupon/create', [authJwt.verifyToken],ProductController.applyDiscountToProduct);
router.get('/coupon/:coupon_code', ProductController.getCouponByCode);
router.get('/coupon',[authJwt.verifyToken], ProductController.getAllCoupons);
router.post('/update-coupon/:id',[authJwt.verifyToken], ProductController.updateCoupon);
router.delete('/delete-coupon/:id',[authJwt.verifyToken], ProductController.deleteCoupon);
module.exports = router;