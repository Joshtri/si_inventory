const crypto = require('crypto');
const express = require ("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
const db = require("../utils/database");

router.get('/',loginController.loginView);


router.get('/header',(req,res) =>{
   res.render('header') 
});

router.get('/reset_pass',(req,res)=>{
    res.render('forget_pass');
})

router.post('/post_login', async (req, res) => {

});

module.exports=router;