const bcrypt = require ("bcrypt");
const express  = require  ("express");
//as a variable connect.
const db = require  ("../utils/database");



exports.updateLogin = (req,res)=>{
  const data = {
    title:"Ubah Password"
  };
};

exports.loginAdmin = (req,res)=>{
  const  {username, password} = req.body;   


  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql,[username], async (err, results,fields) =>{
    if(err){
      console.error(err);
      res.status(500).send('Internal error');

    }
    else if(results.length === 0){
      res.render('login', 
      { 
        errorMessage: 'Invalid email or password.',
      })
    }

    else{
      const admin = results[0];
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (passwordMatch) {
        // Simpan informasi pengguna yang sudah login di sesi
        req.session.admin = admin;

        res.redirect('/dashboard');
      } 
      
      else
      {
        res.render('login', { errorMessage: 'Invalid email or password.' });
      }
    }
  })
};

exports.forgetPassword = (req,res)=>{
  
};

exports.loginView = (req,res)=>{
  const data = {
    title: "Login"
  }

  res.render('login',{
    loginData:data
  });
}

exports.logoutAdmin = (req,res)=>{

};