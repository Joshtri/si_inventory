const express = require('express');
const router = express.Router();
const {protect} = require('../utils/protect');  //function protectnya jangan dipake dlu.
const produkController = require('../controllers/produkController');

router.get('/data_produk', produkController.produkPage);
router.get('/add_produk', produkController.createProdukPage)

//untuk fetch data dari tabel berbeda. 
router.get('/jenis_kategori',produkController.optionKategori);
router.get('/supplier', produkController.optionSupplier);


//untuk post.
router.post('/post_produk', produkController.createProduk);
router.post('/delete_produk',produkController.deleteProduk);
router.post('/update_produk', produkController.updateProduk);



module.exports = router;  