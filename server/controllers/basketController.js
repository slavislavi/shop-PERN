const { BasketDevice, Device } = require('../models/models');

class BasketController {
    async addToBasket(req, res, next) {
        const user = req.user;
        const { deviceId } = req.body;

        const candidate = await BasketDevice.findOne({ where: { basketId: user.id, deviceId } });

        if (candidate) {
            return res.status(400).send({ message: 'This product is already in the cart' });
        }

        const basketItem = await BasketDevice.create({
            basketId: user.id,
            deviceId: deviceId
        });

        return res.json(basketItem);
    }

    async getBasketItemsByUser(req, res) {
        const { id } = req.user;
        const basketItems = await BasketDevice.findAll({
            include: { model: Device },
            where: { basketId: id }
        });

        return res.json(basketItems);
    }

    async deleteBasketItemById(req, res) {
        try {
            const { id } = req.params;
            const deleted = await BasketDevice.destroy({ where: { id } });
            return res.status(200).send('Successfuly removing item');
        } catch (e) {
            return res.status(500).send({ message: 'There was an error removing item' });
        }
    }
}

module.exports = new BasketController();
