const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      cantidad: Number
    }
  ],
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carrito', carritoSchema);
