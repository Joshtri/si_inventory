var express = require('express');
var router = express.Router();
const mysql = require("mysql");
const db = require('../utils/database');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_inventorySMA1',
});



router.get('/statistik/kategori', function (req, res, next) {
  // konek
      // data dari tabel
  
      pool.getConnection((err, connection) => {
          if (err) throw err; //NOT CONNECTED.
          console.log(`Connected as ID ` + connection.threadId);
  
          //show data
          // SELECT SUM (jenis_kelamin = 'Perempuan') AS Total_perempuan FROM penduduk
  
      db.query("SELECT SUM(nama_kategori ='Makanan') AS totalmakanan FROM kategori", (err, rows1) => {
                  //when done with the connection, release it.
          db.query("SELECT SUM(nama_kategori ='Minuman') AS totalminuman FROM kategori", (err, rows2) => {
                  //when done with the connection, release it.
  
                  if (!err) {
                      res.json(
                          {
                              label: ["My First dataset"],
                              backgroundColor: [
                              "rgb(128,0,0)",
                              "rgb(139,0,0)",
                              "rgb(165,42,42)",],
                              data: [rows1[0].totalmakanan, rows2[0].totalminuman],
                              hoverOffset: 2,},
                      );
                  } else {
                      console.log(err);
                  }
                  // console.log("The data from user table: \n",  rows2, rows1);
          });
      });
  });

});

module.exports = router;