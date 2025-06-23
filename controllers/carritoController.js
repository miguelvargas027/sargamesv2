const Carrito = require('../models/Carrito');

exports.guardarCarrito = async (req, res) => {
  console.log('Carrito recibido:', req.body);
  const nuevoCarrito = new Carrito({ productos: req.body });
  await nuevoCarrito.save();
  res.status(201).json({ mensaje: 'Carrito guardado' });
};
