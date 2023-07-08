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

  const sql = "SELECT * FROM admin";

  db.query(sql,(err, results)=>{
    if(err){
      throw err;
    }

    else if (!err){
      res.render ('admin_view',{
        adminData:data,
        success:false,
        tableAdmin:results
      });
    }
  });

};


exports.createAdmin = async(req,res) =>{
  try {
    const { username, password, nama_depan, nama_belakang, nomor_telepon, alamat_email } = req.body;

    // Generate salt untuk hashing password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Mengenkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Menggabungkan nama depan dan belakang menjadi nama lengkap
    const nama_lengkap = `${nama_depan} ${nama_belakang}`;

    // Menyimpan data admin dengan password terenkripsi
    const fieldsAdmin = {
      username: username,
      password: hashedPassword,
      nama_lengkap: nama_lengkap,
      nomor_telepon: nomor_telepon,
      alamat_email: alamat_email
    };

    const sql = 'INSERT INTO admin SET ?';
    db.query(sql, fieldsAdmin, (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        res.send('Registration failed');
      } else {
        res.render('admin_view', {
          success: true,
          adminData: "Admin View",
          tableAdmin: results
        });
      }
    });
  } 
  catch (error) {
    console.error('Registration error:', error);
    res.send('Registration failed');
  }
};

exports.deleteAdmin = (req,res)=>{
  const id = req.body.id;
  const query = 'DELETE FROM admin WHERE id = ?';

  db.query(query,id, (err,results)=>{
    if(err){
      throw err;
    }

    else if(!err){
      res.redirect('/data/data_admin') //ini hanya sememntara saja kok :))
    }
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



