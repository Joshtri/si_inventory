const bcrypt = require ("bcrypt");
const db = require= ("../utils/database")


/* 
  di admin controller kita buat fungsi tambah data, tampilkan data, update dan delete.
*/

exports.adminPages = (req, res) =>{
  const data = {
    title:"Admin View"
  };

  res.render ('admin_view',{
    adminData:data
  });
};


exports.createAdmin = (req,res) =>{
  // const data = {
  //   title: "Tambah Admin"
  // };

  const sql = "INSERT INTO admin SET "

  db.query(sql,)
};

exports.createAdmin = (req,res) =>{
  const data = {
    title: "Tambah Admin"
  };
  
  res.render('add_admin',{
    adminData:data
  });
};



