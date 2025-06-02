const express = require('express');
const router = express.Router();
const productsController = require("./../controllers/product.controller")
const {
  authenticateToken,
  authorizePermission,
} = require('../middlewares/auth.middleware');

// Rutas públicas protegidas: usuarios autenticados pueden ver productos
router.get('/', productsController.getAll);
router.get('/:id', productsController.getOne);

// Rutas restringidas solo a admin para modificar productos
router.post(
  '/',
  authenticateToken,
  authorizePermission('product:edit'),
  productsController.createProduct
);
router.put(
  '/:id',
  authenticateToken,
  authorizePermission('product:edit'),
  productsController.updateProduct
);
router.delete(
  '/:id',
  authenticateToken,
  authorizePermission('product:edit'),
  productsController.deleteProduct
);

module.exports = router;