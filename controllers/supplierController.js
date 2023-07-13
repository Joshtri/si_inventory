const db = require('../utils/database');

exports.supplierPage = (req,res)=>{
  const data ={
    title: "Supplier Data"
  }
  const query = 'SELECT * FROM supplier'

  db.query(query, (err,results)=>{

    if(err){
      res.render(404);
    }
    else if(!err){
      res.render('supplier_view',{
        dataSupplier:data,
        tableSupplier:results
      });
    }
  })
};

exports.addSupplierPage = (req,res)=>{
  const data = { 
    title:"Tambah Supplier"
  }

  res.render('add_supplier',{
    dataSupplier:data
  });
};

exports.createSupplier = (req,res)=>{
  const supplierFields = {
    nama_supplier: req.body.nama_supplier,
    nomor_telepon: req.body.nomor_telepon,
    alamat_email : req.body.alamat_email,
    fax : req.body.fax
  };

  const query = 'INSERT INTO supplier SET ? '

  db.query(query,supplierFields, (err,results)=>{
    if(err){
      throw  err;
    }
    else if(!err){
      res.redirect('/data/data_supplier');
    }
  });
};

exports.deleteSupplier = (req,res)=>{
  const id = req.body.id_supplier;
  const query = 'DELETE FROM supplier WHERE id_supplier = ?'

  db.query(query,id, (err,results)=>{
    if(err){
      throw err;
    }
    else if(!err){
      res.redirect('/data/data_supplier');
    }
  });
}

exports.sendMailSupplier = (req,res)={

}