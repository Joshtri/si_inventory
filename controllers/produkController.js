const db = require('../utils/database');
const multer = require('multer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ExcelJS = require('exceljs');
const fs = require('fs');

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

const uploadExcel = multer({ dest: 'uploads/' });

// Fungsi untuk memproses data dari file CSV dan menyimpan ke tabel kategori
function processData(data) {
  data.forEach((row) => {
    // Simpan data ke tabel kategori dalam database
    const query = `INSERT INTO kategori (nama_kategori, keterangan) VALUES ('${row[0]}', '${row[1]}')`;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
      }
    });
  });
}

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

exports.exportingDataProduk = (req,res)=>{
  const query = 'SELECT * FROM produk';

  db.query(query, (err,results)=>{
    if(err){
      throw err;
    }
    else if(!err){
      const csvWriter = createCsvWriter({
        path:'data_produk.csv',
        header:[
          {id:'id_produk', title:"ID Produk"},
          {id:'nama_produk', title:"Nama Produk"},
          {id:'deskripsi', title:"Deskripsi Produk"},
          {id:'harga', title:"Harga Produk"},
          {id:'jumlah', title:"Jumlah Produk"},
          {id:'satuan', title:"Satuan Produk"},
          {id:'kategori', title:"Kategori Produk"},
          {id:'pemasok', title:"Nama Supplier"},
          {id:'tanggal_masuk', title:"Tanggal Masuk"},
          {id:'catatan', title:"Catatan Produk"},
        ]
      });
      // Tulis data ke file CSV
      csvWriter.writeRecords(results).then(()=>{
        console.log('Data exported to CSV file');
        res.download('data_produk.csv'); // Unduh file CSV
      });
    }
  });
};

exports.importingProduk = (req,res)=>{
  uploadExcel.single('csvFile')(req,res,function(err){
    const file = req.file;
    // Pastikan file yang diupload adalah file CSV
    if (file.mimetype !== 'text/csv') {
      return res.status(400).send('Invalid file format');
    }
  
    const workbook = new ExcelJS.Workbook();
    workbook.csv.readFile(file.path)
      .then(function() {
        const worksheet = workbook.getWorksheet(1);
        const jsonData = [];
  
        worksheet.eachRow(function(row, rowNumber) {
          const rowData = [];
          row.eachCell(function(cell, colNumber) {
            rowData.push(cell.value);
          });
          jsonData.push(rowData);
        });
  
        // Proses data yang telah dibaca
        processData(jsonData);
  
        // Hapus file yang diupload setelah selesai diproses
        fs.unlinkSync(file.path);
  
        res.send('Data imported successfully');
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).send('Error importing data');
      });
    })
};