const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.delete('/:id', checkRole('ADMIN'), typeController.delete);
router.get('/', typeController.getAll);
router.get('/:id', typeController.getOne);

module.exports = router;
