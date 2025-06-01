const express = require('express');
const router = express.Router();
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

const { login, register } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

// Rutas públicas protegidas: usuarios autenticados pueden ver productos
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

// Rutas restringidas solo a admin para modificar productos
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  productsController.create
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  productsController.update
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  productsController.delete
);

module.exports = router;