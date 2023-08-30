const { Rating, Device } = require('../models/models');
const jwt = require('jsonwebtoken');
const ApiError = require("../error/ApiError");

class RatingController {
    async addRating(req, res, next) {
        try {
            const { rate, deviceId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_ACCESS);
            const device = await Device.findOne({ where: { id } });

            await Rating.create({ rate, deviceId, userId: user.id });

            const allRates = await Rating.count({ where: { deviceId } });
            const totalRate = Math.round((device.rating + rate) / allRates);
            device.rating = totalRate;
            await device.save();

            return res.json(totalRate);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkRating(req, res) {
        try {
            const { deviceId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const checkRating = await Rating.findOne({
                where: { deviceId, userId: user.id },
            });
            const checkDevices = await Device.findOne({ where: { id: deviceId } });
            if (!checkDevices) {
                return res.json({ allow: false });
            } else if (checkRating && checkDevices) {
                return res.json({ allow: false });
            }
            return res.json({ allow: true });
        } catch (e) {
            return res
                .status(401)
                .json('Something going wrong in checkAddRatingMiddleware.js');
        }
    }
}

module.exports = new RatingController();
