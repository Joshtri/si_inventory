const crypto = require('crypto');
const express = require ("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
const db = require("../utils/database");
u

router.get('/login',loginController.loginAdmin)
router.get('/reset_pass', loginController.updatePasswordPages)
router.get('/forget_pass', loginController.forgetPasswordPages)


router.post('/post_login', loginController.adminLogin); 
router.post('/sending_mail', loginController.sendmail_user);



router.post('/post_login', async (req, res) => {

});

module.exports=router;