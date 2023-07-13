const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');


router.get('/data_supplier', supplierController.supplierPage);
router.get('/add_supplier', supplierController.addSupplierPage);


router.post('/post_supplier', supplierController.createSupplier);
router.post('/delete_supplier', supplierController.deleteSupplier);


module.exports = router;