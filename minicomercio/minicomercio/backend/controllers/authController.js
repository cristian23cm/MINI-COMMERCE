const Usuario = require('../models/Usuario');
const { generarToken } = require('../config/jwt');

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El email ya esta registrado' });
    const usuario = await Usuario.create({ nombre, email, password });
    res.status(201).json({
      token: generarToken({ id: usuario._id, rol: usuario.rol }),
      usuario: { nombre, email, rol: usuario.rol }
    });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararPassword(password)))
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    res.json({
      token: generarToken({ id: usuario._id, rol: usuario.rol }),
      usuario: { nombre: usuario.nombre, email, rol: usuario.rol }
    });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};
