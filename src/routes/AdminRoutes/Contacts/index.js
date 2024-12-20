const express = require('express');
const router = express.Router();
const { ContactController } = require('../../../controller');
const { authJwt } = require("../../../middleware");

router.post('/create', ContactController.createContact);
 
router.get('/get',[authJwt.verifyToken], ContactController.getContactById);
// get applied job offers
router.get('/',[authJwt.verifyToken], ContactController.getAllContact);
router.delete('/delete-contact/:id',[authJwt.verifyToken], ContactController.deleteContact);

module.exports = router;