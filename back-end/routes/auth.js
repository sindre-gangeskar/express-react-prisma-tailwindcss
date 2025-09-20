const express = require('express');
const isAuth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const { createAndThrowError } = require('../utils/utils');
const UserService = require('../services/UserService');
const router = express.Router();

router.get('/', isAuth, function (req, res, next) {
  return res.status(200).jsend.success({ statusCode: 200, message: 'You are authorized!' });
})

router.get('/login', function (req, res, next) {
  return res.status(200).render('login', { state: {} })
})

router.post('/login', asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) createAndThrowError(400, 'fail', 'username and password are required');
  const token = await UserService.getAndAuthorize(username, password);
  res.cookie('token', token, { httpOnly: true })
  return res.status(200).redirect('/');
}))

router.post('/logout', (req, res, next) => {
  res.clearCookie('token');
  return res.status(200).redirect('/')
})

module.exports = router;