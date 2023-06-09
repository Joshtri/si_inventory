const express  = require ("express");
const multer = require('multer');
const router = express.Router();
const adminController = require ('../controllers/adminController');

router.get('/data_admin', adminController.adminPages);
router.get('/add_admin', adminController.createAdminPages);

router.post('/post_admin', adminController.createAdmin); 


module.exports=router;  