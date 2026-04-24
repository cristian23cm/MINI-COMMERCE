const router = require('express').Router();
const ctrl = require('../controllers/productoController');
const { proteger, soloAdmin } = require('../middleware/authMiddleware');

router.get('/', ctrl.obtenerProductos);
router.get('/:id', ctrl.obtenerProducto);
router.post('/', proteger, soloAdmin, ctrl.crearProducto);
router.put('/:id', proteger, soloAdmin, ctrl.actualizarProducto);
router.delete('/:id', proteger, soloAdmin, ctrl.eliminarProducto);

module.exports = router;
