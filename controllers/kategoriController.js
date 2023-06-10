const db = require('../utils/database');

exports.kategoriPages = (req,res)=>{
  const data = {
    title:"Kategori View"
  };

  const sql = 'SELECT * FROM kategori'
  db.query(sql,(err,results)=>{
    if(err){
      throw err;
    }
    else if (!err){
      res.render('kategori_view', {
        kategoriData:data,
        tableKategori:results,
        success:false
        
      });
    }
  });
}


exports.createKategori = (req,res)=>{
  const data = {
    title: "Kategori View"
  }

  const kategoriFields = {
    nama_kategori:req.body.nama_kategori,
    keterangan:req.body.keterangan
  }

  const sql = 'INSERT INTO kategori SET ?'
  db.query(sql,kategoriFields,(err,results)=>{

    if(err){
      throw err;
    }
    else if(!err){
      res.render('kategori_view',{
        success:true,
        kategoriData:data,
        tableKategori: results
      });
    }
  });
}

exports.createKategoriPages = (req,res) =>{
  const data = {
    title:"Tambah Kategori"
  }

  res.render('add_kategori',{
    kategoriData:data
  })
};