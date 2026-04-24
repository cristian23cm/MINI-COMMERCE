const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'minicomercio_secret_key';

const generarToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '24h' });
const verificarToken = (token) => jwt.verify(token, SECRET);

module.exports = { generarToken, verificarToken };
