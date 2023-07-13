const db = require('../utils/database');
const multer = require('multer');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images'); // Ganti dengan path ke direktori penyimpanan foto
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Inisialisasi upload multer
const upload = multer({ storage: storage });

exports.produkPage = (req,res)=>{
  const data = {
    title: "Produk View"
  };

  const query = 'SELECT * FROM produk';
  db.query(query, (err,results)=>{

    if(err){
      res.send(err);
    }
    else if(!err){
      res.render('produk_view',{
        produkData : data,
        tableProduk : results
      });
    }
  });
};


exports.createProduk = (req, res) => {
  upload.single('foto')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json({ error: 'Terjadi kesalahan saat mengupload foto' });
    } else if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Terjadi kesalahan saat mengupload foto' });
    }

    const produkFields = {
      nama_produk: req.body.nama_produk,
      kategori: req.body.kategori,
      deskripsi: req.body.deskripsi,
      jumlah: req.body.jumlah,
      harga: req.body.harga,
      satuan: req.body.satuan,
      pemasok: req.body.pemasok,
      tanggal_masuk: req.body.tanggal_masuk,
      catatan: req.body.catatan,
      // supplier:req.body.supplier, //tunggu field ini dibuat di DB
      foto: req.file ? req.file.filename : '' // Simpan nama file foto jika ada, atau kosong jika tidak ada
    };

    const query = 'INSERT INTO produk SET ?';

    db.query(query, produkFields, (err, results) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/data/data_produk');
      }
    });
  });
};

exports.deleteProduk = (req,res)=>{
  const id = req.body.id_produk;
  const query = 'DELETE FROM produk WHERE id_produk = ?'

  db.query(query,id, (err,results)=>{
    if(err){
      throw err;
    }

    else if(!err){
      res.redirect('/data/data_produk') //untuk sementara saja dan belum tambah notifikasi berhasil.
    }
  });
};

exports.updateProduk = (req,res)=>{
  const {id_produk, nama_produk, kategori, catatan, jumlah, satuan, pemasok, tanggal_masuk, deskripsi,harga} = req.body;

  const query = `UPDATE produk SET
  nama_produk = '${nama_produk}',
  kategori = '${kategori}',
  catatan = '${catatan}',
  jumlah = '${jumlah}',
  satuan = '${satuan}',
  pemasok = '${pemasok}',
  tanggal_masuk = '${tanggal_masuk}',
  deskripsi = '${deskripsi}',
  harga = '${harga}'

  WHERE id_produk = ${id_produk}`;
  

  db.query(query, (err,results)=>{
    if(err){
      throw err;
    }

    else if(!err){
      res.redirect('/data/data_produk')
    };
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

//controller khusus untuk fetch data kategori ke option di tambah data produk.
exports.optionKategori = (req,res)=>{
  const query = 'SELECT * FROM kategori'

  db.query(query, (err, results)=>{
    if(err){
      throw err;
    }
    else if(!err){
      res.json(results);
    }
  });
};

//controller khusus untuk fetch data supplier ke option di tambah data produk.

exports.optionSupplier = (req,res)=>{
  const query = 'SELECT * FROM supplier';

  db.query(query, (err,results)=>{
    if(err){
      throw err;
    }
    else if(!err){
      res.json(results);
    }
  });
};