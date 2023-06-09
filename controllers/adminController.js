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


exports.createAdmin = async(req,res) =>{
  

  //pemisahan.
  // const {nama_depan,nama_belakang} = req.body;
  // const nama_lengkap = `${nama_depan} ${nama_belakang}`

  const fieldsAdmin = {
              //bagian ini boleh beda dengan nama field di DB.
    username: req.body.username,
    password: req.body.password,
    nama_lengkap: req.body.nama_lengkap,
    nomor_telepon: req.body.nomor_telepon,
    alamat_email: req.body.alamat_email,
    // profile_admin: file.foto_profil

  };

  const sql = 'INSERT INTO admin SET ?'
  db.query(sql,fieldsAdmin, (err, results)=>{

    if(err){
      throw err;
    }

    else if (!err){
      res.render('admin_view',{
        success:true,
        adminData:"Admin View"
      });
    }
  })
};



exports.createAdminPages = (req,res) =>{
  const data = {
    title: "Tambah Admin"
  };
  res.render('add_admin',{
    adminData:data
  });
};



