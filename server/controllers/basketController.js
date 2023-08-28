const { BasketDevice, Device } = require('../models/models');

class BasketController {
    async addToBasket(req, res) {
        const user = req.user;
        const { deviceId } = req.body;

        const isExist = await BasketDevice.findOne({ where: { basketId: user.id, deviceId } });

        if (isExist) {
            return res.status(400).send({ message: 'This product is already in the cart' });
        }

        const basketItem = await BasketDevice.create({
            basketId: user.id,
            deviceId: deviceId
        });

        return res.json(basketItem);
    }

    async getByUser(req, res) {
        const { id } = req.user;
        const basketItems = await BasketDevice.findAll({
            include: { model: Device },
            where: { basketId: id }
        });

        return res.json(basketItems);
    }

    async delete(req, res) {
        try {
            const user = req.user;
            const { id } = req.body; // req.params ? query ?
            const deleted = await BasketDevice.destroy({ where: { basketId: user.id, id } });
            return res.status(200).send('Successfuly removing item');
        } catch (e) {
            return res.status(500).send({ message: 'There was an error removing item' });
        }
    }
}

module.exports = new BasketController();
