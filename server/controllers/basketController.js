const ApiError = require('../error/ApiError');
const { Device, BasketDevice } = require('../models/models');
const basketService = require('../service/basketService');

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const user = req.user;
            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            const { deviceId } = req.body;

            const isExist = await BasketDevice.findOne({ where: { id: user.id, deviceId } });

            if (isExist) {
                return res.status(400).send({ message: 'This product is already in the cart' });
            }

            const basket = await BasketDevice.create({
                basketId: user.id,
                DeviceId: deviceId,
            });

            return res.json(basket);
        } catch (e) {
            next(e);
        }
    }

    async getByUser(req, res, next) {
        try {
            const { id } = req.user;

            if (!id) {
                throw ApiError.UnauthorizedError();
            }

            const basketItems = await BasketDevice.findAll({
                include: { model: Device },
                where: { basketId: id }
            });

            return res.json(basketItems);
        } catch (e) {
            next(e);
        }
    }

    async removeItem(req, res, next) {
        try {
            const { deviceId } = req.body;

            if (!deviceId) {
                throw ApiError.badRequest('Device not found');
            }

            const deleted = await BasketDevice.destroy({ where: { id: deviceId } });
            return res.json({ deleted });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BasketController();
