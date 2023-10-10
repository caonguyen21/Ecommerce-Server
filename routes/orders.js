const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken')
const orderController = require('../controllers/ordersControllers');
router.get('/', verifyToken, orderController.getUserOrders)
module.exports = router;
