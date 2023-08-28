const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.get('/', basketController.getBasketItemsByUser);
router.post('/', basketController.addToBasket);
router.put('/', basketController.change);
router.delete('/', basketController.deleteBasketItemById);

module.exports = router;
