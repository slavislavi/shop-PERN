const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create);
router.post('/rate', authMiddleware, deviceController.sendRate);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete('/:id', checkRole('ADMIN'), deviceController.delete);

module.exports = router;
