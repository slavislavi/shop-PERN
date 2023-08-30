const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const checkDeleteDeviceFromBasket = require('../middleware/CheckDeleteDeviceFromBasket');

router.get('/', authMiddleware, basketController.getByUser);
router.post('/', authMiddleware, basketController.addToBasket);
router.delete('/', authMiddleware, checkDeleteDeviceFromBasket, basketController.removeItem);

module.exports = router;
