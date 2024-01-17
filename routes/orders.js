const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken')
const orderController = require('../controllers/ordersControllers');
router.get('/', verifyToken, orderController.getUserOrders)
router.post('/addOrder', verifyToken, orderController.addUserOrders)
router.delete('/deleteOrder/:orderId', verifyToken, orderController.deleteUserOrders)
module.exports = router;
