const express = require('express');
const router = express.Router();
const {AdminAuthenticationController} = require('../../../controller');
const { authJwt } = require("../../../middleware");

router.post('/signup', AdminAuthenticationController.signup);
router.post('/login', AdminAuthenticationController.login);

module.exports = router;