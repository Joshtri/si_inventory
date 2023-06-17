const express = require ("express");
const loginController = require('../controllers/loginController')
const router = express.Router();

router.get('/login',loginController.loginAdmin)
router.get('/reset_pass', loginController.updatePasswordPages)
router.get('/forget_pass', loginController.forgetPasswordPages)


router.post('/post_login', loginController.adminLogin); 
router.post('/sending_mail', loginController.sendmail_user);



module.exports=router;