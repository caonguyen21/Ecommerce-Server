const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productControllers');
const { verifyToken } = require('../middleware/verifyToken')
// Create a new product
router.post('/', productsControllers.createProduct);

// Get all products
router.get('/', productsControllers.getAllProducts);

// Get a product by ID
router.get('/:id', productsControllers.getProductById);

// Update a product by ID
router.put('/:id', productsControllers.updateProduct);

// Delete a product by ID
router.delete('/:id', productsControllers.deleteProduct);

// Search a product by name
router.get('/search/:key', productsControllers.searchProducts);

// Example route for adding a comment
router.post('/addComment', verifyToken, productsControllers.addComment);
module.exports = router;
