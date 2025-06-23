const Producto = require('../models/Producto');

exports.obtenerProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

exports.obtenerProductoPorId = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.json(producto);
};

exports.crearProducto = async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();
  res.status(201).json(nuevoProducto);
};

exports.actualizarProducto = async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(producto);
};

exports.eliminarProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
