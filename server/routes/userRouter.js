const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
