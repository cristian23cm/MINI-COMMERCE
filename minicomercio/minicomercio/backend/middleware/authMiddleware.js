const { verificarToken } = require('../config/jwt');

const proteger = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Sin token de autorizacion' });
  try {
    req.usuario = verificarToken(token);
    next();
  } catch {
    res.status(401).json({ mensaje: 'Token invalido' });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'Solo administradores' });
  next();
};

module.exports = { proteger, soloAdmin };
