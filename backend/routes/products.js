const express = require('express');
const router = express.Router();
const productService = require('../services/ProductService');
const asyncHandler = require('../middleware/asyncHandler');

router.get('/', asyncHandler(async (req, res, next) => {
  const { page, items } = req.query;
  const { products, hasNextPage, nextPage, totalPages } = await productService.getAll(+page, +items || 10, !!page);
  const hasPreviousPage = page > 1
  return res.status(200).render('products', { products, hasNextPage, nextPage, totalPages, currentPage: page, hasPreviousPage });
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
  const product = await productService.getById(req.params.id);
  return res.status(200).render('product', { product: product });
}))


module.exports = router;