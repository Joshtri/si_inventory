const express  = require ("express");
const router = express.Router();
const adminController = require ('../controllers/adminController');

router.get('/data_admin', adminController.adminPages);
router.get('/add_admin', adminController.createAdmin);

module.exports=router;  