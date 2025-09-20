var express = require('express');
const ProductService = require('../services/ProductService');
const asyncHandler = require('../middleware/asyncHandler');
var router = express.Router();
const productService = new ProductService();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
