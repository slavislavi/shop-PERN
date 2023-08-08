const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.put('/:id', checkRole('ADMIN'), brandController.update);
router.delete('/:id', checkRole('ADMIN'), brandController.delete);
router.get('/', brandController.getAll);

module.exports = router;
