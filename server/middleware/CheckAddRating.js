const { Rating, Device } = require('../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const { deviceId } = req.body;

        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Rating.findOne({
            where: { deviceId, userId: user.id },
        });

        const checkDevice = await Device.findOne({ where: { id: deviceId } });

        if (!checkDevice) {
            return res.json('The product does not exist in the database');
        } else if (checkRating && checkDevice) {
            return res.json('You have already evaluated this product');
        }
    } catch (e) {
        return res
            .status(401)
            .json('Something went wrong in CheckAddRatingMiddleware');
    }
};
