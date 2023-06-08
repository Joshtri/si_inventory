const express = require ("express");
const router = express.Router();

router.get('/',(req,res) => {
    res.render('login');
});

router.get('/header',(req,res) =>{
   res.render('header') 
});

router.get('/reset_pass',(req,res)=>{
    res.render('forget_pass');
})

module.exports=router;