const express = require('express');
const router = express.Router();
const {protect} = require('../utils/protect');  //function protectnya jangan dipake dlu.
const kategoriController = require('../controllers/kategoriController');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });


router.get('/data_kategori', kategoriController.kategoriPages);
router.get('/add_kategori', kategoriController.createKategoriPages);
router.get('/exports_kategori', kategoriController.exportingDataKategori);

router.post('/post_kategori', kategoriController.createKategori);
router.post('/delete_kategori', kategoriController.deleteKategori);
router.post('/update_kategori', kategoriController.updateKategori);
// router.post('/import_kategori', kategoriController.importingKategori);
router.post('/import_kategori', upload.single('csvFile'), kategoriController.importingKategori);


module.exports = router; 


