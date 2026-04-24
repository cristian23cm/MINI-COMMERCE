const router = require('express').Router();
const ctrl = require('../controllers/pedidoController');
const { proteger, soloAdmin } = require('../middleware/authMiddleware');

router.post('/', proteger, ctrl.crearPedido);
router.get('/mis-pedidos', proteger, ctrl.misPedidos);
router.get('/todos', proteger, soloAdmin, ctrl.todosPedidos);

module.exports = router;
