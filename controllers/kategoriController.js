const db = require('../utils/database');
const multer = require('multer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const ExcelJS = require('exceljs');


const upload = multer({ dest: 'uploads/' });

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
        successUpdate : false,
        tableKategori:results,
        success:false,
        successMessage:false,
        errorMessage:false
        
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
        successUpdate : false,
        successMessage : false,
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

//Views Delete.


// Untuk delete.
exports.deleteKategori = (req, res) => {
  const id = req.body.id_kategori;
  const query = 'DELETE FROM kategori WHERE id_kategori = ?';

  db.query(query, id, (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).render('kategori_view',
       {
        successMessage: 'Data deleted successfully',
        errorMessage: 'Error deleting data',
        kategoriData: 'Kategori View',
        tableKategori: 5,
        success : false
       });
      return;
    }
    if (results.affectedRows === 0) {
      // Jika tidak ada data yang terhapus
      res.status(404).render('kategori_view',
       {
        successMessage: 'Data deleted successfully',
        errorMessage: 'Data not found',
        kategoriData: 'Kategori View',
        successUpdate: false,
        tableKategori: 5,
        success : false
       });
    } else {
      // Jika data berhasil dihapus
      res.status(200).render('kategori_view', 
      { 
        successMessage: 'Data deleted successfully',
        kategoriData: 'Kategori View',
        tableKategori: 5,
        successUpdate: false,
        success : false
      });
    }
  });
};

exports.updateKategori = (req, res) => {
  const { nama_kategori, keterangan, id_kategori } = req.body;
  
  const query = `UPDATE kategori SET 
    nama_kategori = '${nama_kategori}', 
    keterangan = '${keterangan}' 
    WHERE id_kategori = ${id_kategori}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
    } else {
      res.render('kategori_view',{
        success:false,
        successUpdate:true,
        successMessage : false,
        kategoriData:"Kategori View",
        tableKategori: 5
      });
    }
  });
};

// Ekspor data dalam format CSV
exports.exportingDataKategori = (req, res) => {
  // Ambil data dari database
  db.query('SELECT * FROM kategori', (error, results) => {
    if (error){
      throw error;
    }
    // Konfigurasi penulisan file CSV
    const csvWriter = createCsvWriter({
      path: 'data.csv',
      header: [
        { id: 'id_kategori', title: 'ID Kategori' },
        { id: 'nama_kategori', title: 'nama_kategori' },
        { id: 'keterangan', title: 'keterangan' },
        
        // Tambahkan kolom lain sesuai dengan struktur tabel
      ],
    });

    // Tulis data ke file CSV
    csvWriter.writeRecords(results).then(() => {
      console.log('Data exported to CSV file');
      res.download('data_kategori.csv'); // Unduh file CSV
    });
  });
};

exports.importingKategori = (req,res)=>{
  upload.single('csvFile')(req,res,function(err){
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