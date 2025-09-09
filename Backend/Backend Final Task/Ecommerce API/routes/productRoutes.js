const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// public
router.get('/', getProducts);
router.get('/:id', getProductById);

// admin
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
