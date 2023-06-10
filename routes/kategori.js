const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');



router.get('/data_kategori', kategoriController.kategoriPages);
router.get('/add_kategori', kategoriController.createKategoriPages);

router.post('/post_kategori', kategoriController.createKategori)


module.exports = router; 


