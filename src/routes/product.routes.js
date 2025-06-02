const express = require('express');
const router = express.Router();
const productsController = require("./../controllers/product.controller")
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

// Rutas públicas protegidas: usuarios autenticados pueden ver productos
router.get('/', productsController.getAll);
router.get('/:id', productsController.getOne);

// Rutas restringidas solo a admin para modificar productos
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  productsController.createProduct
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  productsController.updateProduct
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  productsController.deleteProduct
);

module.exports = router;