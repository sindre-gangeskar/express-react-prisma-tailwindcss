const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const userService = require('../services/UserService');
const ProductService = require('../services/ProductService');

router.get('/auth/login', (req, res, next) => {
  return res.status(200).jsend.success({ statusCode: 200, title: 'API Auth Endpoint' })
})

router.post('/auth/login', asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const token = await userService.getAndAuthorize(username, password);
  return res.status(200).jsend.success({ message: 'Succesfully logged in', token: token });
}))

router.get('/products', asyncHandler(async (req, res, next) => {
  /* Articial delay */
  await new Promise(resolve => { setTimeout(resolve, 3000) });
  const products = await ProductService.getAll();
  return res.status(200).jsend.success({ statusCode: 200, message: 'Successfully retrieved products', products: products });
}))

router.get('/products/random', asyncHandler(async (req, res, next) => {
  const product = await ProductService.getRandom();
  return res.status(200).jsend.success({ statusCode: 200, message: 'Successfully retrieved random product', product: product });
}))

router.get('/products/:id', asyncHandler(async (req, res, next) => {
  const product = await ProductService.getById(req.params.id);
  return res.status(200).jsend.success({ statusCode: 200, message: 'Successfully retrieved product', product: product });
}))

module.exports = router;