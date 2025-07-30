const express = require('express');
const router = express.Router();
const { insertSampleProducts,getproductStats,getproductAnalysis } = require('../controllers/product-controller');

// POST /products/add
router.post('/add',insertSampleProducts);
router.get('/stats',getproductStats)
router.get("/get",getproductAnalysis)

module.exports = router;
