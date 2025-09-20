const express = require('express');
const router = express.Router();
const productService = require('../services/ProductService');
const asyncHandler = require('../middleware/asyncHandler');

router.get('/', asyncHandler(async (req, res, next) => {
  const products = await productService.getAll();
  return res.status(200).render('products', { products: products });
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
  const product = await productService.getById(req.params.id);
  return res.status(200).render('product', { product: product });
}))

module.exports = router;