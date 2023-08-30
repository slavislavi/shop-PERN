const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const checkDeleteDeviceFromBasket = require('../middleware/CheckDeleteDeviceFromBasket');

router.get('/', authMiddleware, basketController.getByUser);
router.post('/', authMiddleware, basketController.addToBasket);
router.delete('/:id', authMiddleware, checkDeleteDeviceFromBasket, basketController.delete);

module.exports = router;
