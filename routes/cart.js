const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken')
const cartController = require('../controllers/cartControllers');

router.get('/find/', verifyToken, cartController.getCart)
router.post('/', verifyToken, cartController.addCart)
router.delete('/:cartItem', verifyToken, cartController.deleteCartItem)

module.exports = router;
