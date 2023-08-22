const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/', authMiddleware, basketController.getBasketItemsByUser);
router.post('/', authMiddleware, basketController.addToBasket);
router.delete('/:id', authMiddleware, basketController.deleteBasketItemById);

module.exports = router;
