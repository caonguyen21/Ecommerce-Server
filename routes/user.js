const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken')
const userController = require('../controllers/usersControllers');
router.get('/', verifyToken, userController.getUser)
router.delete('/', verifyToken, userController.detele)
module.exports = router;
