const express = require('express');
const router = express.Router();
const {protect} = require('../utils/protect');  //function protectnya jangan dipake dlu.
const produkController = require('../controllers/produkController');

router.get('/data_produk', produkController.produkPage);
router.get('/add_produk', produkController.createProdukPage)



module.exports = router;