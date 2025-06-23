const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.post('/', carritoController.guardarCarrito);

module.exports = router;
