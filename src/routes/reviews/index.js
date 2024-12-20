const express = require('express');
const router = express.Router();
const {ReviewController} = require('../../controller');
const { authJwt } = require("../../middleware");

router.post('/create', ReviewController.createReview);
 
router.get('/get', ReviewController.getAllReviews);
// get applied job offers
router.get('/get/:id', ReviewController.getReviewById);
router.delete('/delete-reviews/:id',[authJwt.verifyToken], ReviewController.deleteReview);

module.exports = router;