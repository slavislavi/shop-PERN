const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.get('/', authMiddleware, basketController.getByUser);
router.post('/', authMiddleware, basketController.addToBasket);
router.delete('/:id', authMiddleware, basketController.delete);

module.exports = router;
