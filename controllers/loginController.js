const bcrypt = require ("bcrypt");
const express  = require  ("express");
const nodemailer = require('nodemailer');
//as a variable connect.
const db  = require  ("../utils/database");



exports.loginAdmin = (req, res) => {
  const data = {
    title : "Login View"
  }
  res.render('login', {
    loginData:data,
    notifier:false
  });
};

exports.adminLogin = (req, res) => {
  const data = {
    title: "Login View"
  };

  // Destructuring
  const { username, password } = req.body;
  // Declare SQL query
  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, username, (err, result) => {
    if (err) {
      throw err;
    } else if (result.length === 0) {
      return res.send("Username tidak ditemukan");
    }

    bcrypt.compare(password, result[0].password, (err, passwordMatch) => {
      if (err) {
        throw err;
      }

      if (!passwordMatch) {
        res.render("login", {
          loginData: data,
          notifier: true
        });
      } else {
        // Set data pengguna ke sesi
        req.session.userData = {
          username: result[0].username
        };
        res.redirect("/dashboard");
      }
    });
  });
};


// exports.adminLogin = (req, res) => {
//   const data = {
//     title : "Login View"
//   };

//   // destructuring
//   const { username, password } = req.body;
//   // declare sql query
//   const sql = "SELECT * FROM admin WHERE username = ?";
//   db.query(sql, username, (err, result) => {
//     if (err){
//       throw err
//     }

//     else if (result.length === 0) 
//     {
//       return res.send("username tidak ditemukan");
//     }

//     bcrypt.compare(password, result[0].password, (err, result) => {
//       if (err){
//         throw err
//       };
//       if (!result){
//         // return res.send("Password salah");
//         res.render('login',{
//           loginData:data,
//           notifier:true
//         })
//       }
//       else{
//           // Set data pengguna ke sesi
//           req.session.userData = {
//             username: result[0].username
//           };
//         res.redirect("/dashboard");
//       }

//     });
//   });
// };

exports.updateLogin = (req,res)=>{
  const data = {
    title:"Ubah Password"
  };
};

// Buat transporter untuk pengiriman email
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "tryandtryx@outlook.com",
    pass: "idonttryagain11",
  },
});

// Untuk POST EMAIL
exports.sendmail_user = (req, res) => {
  const { alamat_email_user } = req.body;

  // Konfigurasi email yang akan dikirim
  const mailOptions = {
    from: 'tryandtryx@outlook.com',
    to:alamat_email_user,
    subject: 'UBAH PASSWORD - SI INVENTORY SMAN1',
    text: 'localhost:3000/reset_pass'
  };

  // Mengirim email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error occurred');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
};


exports.updatePasswordPages = (req,res)=>{
  res.render('update_pass');
};

exports.forgetPasswordPages = (req,res)=>{
  res.render('forget_pass');
}