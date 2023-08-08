const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.put('/:id', checkRole('ADMIN'), typeController.update);
router.delete('/:id', checkRole('ADMIN'), typeController.delete);
router.get('/', typeController.getAll);

module.exports = router;
