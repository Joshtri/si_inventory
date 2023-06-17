const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const {protect} = require('../utils/protect');  //function protectnya jangan dipake dlu.

router.get('/dashboard' ,protect,dashboardController.dashboardPages);
router.get('/my_profile' ,protect,dashboardController.myProfilePages);

// Rute logout
router.get('/logout', dashboardController.logout);



module.exports = router;