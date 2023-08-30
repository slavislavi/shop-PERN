const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const checkAddRatingMiddleware = require('../middleware/CheckAddRating');
const ratingController = require('../controllers/ratingController');

router.post(
    '/',
    authMiddleware,
    checkAddRatingMiddleware,
    ratingController.addRating
);
router.post('/check-rating', authMiddleware, ratingController.checkRating);

module.exports = router;
