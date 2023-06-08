const bcrypt = require ("bcrypt");
const express  = require  ("express");
//as a variable connect.
const {connect, db} = require  ("../utils/database");



exports.updateLogin = (req,res)=>{
  const data = {
    title:"Ubah Password"
  };
};

exports.loginAdmin = (req,res)=>{
  const data = {username, password} = req.body;
  const query = 'SELECT * FROM admin WHERE username = ?';

  //mendapatkan query.
  connect().query(query, async(error,results,fields)=>{

    if(error){
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

    else if(results.length === 0){
      res.render('login',{
        errorMessage:"invalid email or password"
      })
    }

    else if(!error){
      
      const admin = results[0];
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if(passwordMatch){
        //SIMPAN INFORMASI PENGGUNA YANG SUDAH LOGIN DI SESI
        req.session.admin = admin;
        res.redirect('dashboard');
      }

      else if(!passwordMatch){
        res.render('login',{ errorMessage: 'Invalid password.' })
      }
    }
  }); 
};

exports.forgetPassword = (req,res)=>{
  
};