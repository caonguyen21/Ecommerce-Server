const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken')
const favoriteController = require('../controllers/favoriteControllers');

router.get('/', verifyToken, favoriteController.getFavorites)
router.post('/', verifyToken, favoriteController.addFavorite)
router.delete('/:favItemId', verifyToken, favoriteController.deleteFavtItem)
module.exports = router;
