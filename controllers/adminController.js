const bcrypt = require ("bcrypt");
const multer = require('multer');
const db = require("../utils/database")



/* 
  di admin controller kita buat fungsi tambah data, tampilkan data, update dan delete.
*/

exports.adminPages = (req, res) =>{
  const data = {
    title:"Admin View"
  };

  res.render ('admin_view',{
    adminData:data,
    success:false
  });
};


exports.createAdmin = (req, res) => {
  const { nama_depan, nama_belakang } = req.body;
  const nama_lengkap = `${nama_depan} ${nama_belakang}`;

  const fieldsAdmin = {
    username: req.body.username,
    password: req.body.password,
    nama_lengkap: nama_lengkap,
    nomor_telepon: req.body.nomor_telepon,
    alamat_email: req.body.alamat_email,
  };

  // Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }

    // Hash the password with the generated salt
    bcrypt.hash(fieldsAdmin.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }

      // Store the hashed password in the fieldsAdmin object
      fieldsAdmin.password = hash;

      const sql = 'INSERT INTO admin SET ?';
      db.query(sql, fieldsAdmin, (err, results) => {
        if (err) {
          throw err;
        } else {
          res.render('admin_view', {
            success: true,
            adminData: 'Admin View',
          });
        }
      });
    });
  });
};

exports.showDataTable = (req,res)=>{

  
};



exports.createAdminPages = (req,res) =>{
  const data = {
    title: "Tambah Admin"
  };
  res.render('add_admin',{
    adminData:data
  });
};



