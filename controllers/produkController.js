const db = require('../utils/database');

exports.produkPage = (req,res)=>{
  const data = {
    title: "Produk View"
  };

  const sql = 'SELECT * FROM ';
  // db.query()

  res.render('produk_view',{
    produkData : data
  });
};


exports.createProdukPage = (req,res)=>{
  const data = {
    title:"Tambah Produk"
  }

  res.render('add_produk',{
    produkData:data
    
  });
}