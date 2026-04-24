const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

exports.crearPedido = async (req, res) => {
  try {
    const { productos } = req.body;
    let total = 0;
    const items = [];
    for (const item of productos) {
      const prod = await Producto.findById(item.productoId);
      if (!prod || prod.stock < item.cantidad)
        return res.status(400).json({ mensaje: `Stock insuficiente para ${prod?.nombre}` });
      items.push({ producto: prod._id, cantidad: item.cantidad, precio: prod.precio });
      total += prod.precio * item.cantidad;
      prod.stock -= item.cantidad;
      await prod.save();
    }
    const pedido = await Pedido.create({ usuario: req.usuario.id, productos: items, total });
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

exports.misPedidos = async (req, res) => {
  const pedidos = await Pedido.find({ usuario: req.usuario.id }).populate('productos.producto');
  res.json(pedidos);
};

exports.todosPedidos = async (req, res) => {
  const pedidos = await Pedido.find()
    .populate('usuario', 'nombre email')
    .populate('productos.producto');
  res.json(pedidos);
};
