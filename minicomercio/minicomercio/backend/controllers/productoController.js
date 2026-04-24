const Producto = require('../models/Producto');

exports.obtenerProductos = async (req, res) => {
  const productos = await Producto.find({ activo: true });
  res.json(productos);
};

exports.obtenerProducto = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
};

exports.crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(producto);
};

exports.eliminarProducto = async (req, res) => {
  await Producto.findByIdAndUpdate(req.params.id, { activo: false });
  res.json({ mensaje: 'Producto desactivado' });
};
