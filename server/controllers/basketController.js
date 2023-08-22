const ApiError = require('../error/ApiError');
const { Brand } = require('../models/models');

class BasketController {
    async addToBasket(req, res, next) {
        const { name } = req.body;
        const isExist = await Brand.findOne({ where: { name } });

        if (isExist) {
            return next(ApiError.badRequest('Brand with this name already exists'));
        }

        if (!(name.trim().length)) {
            return next(ApiError.badRequest('Name must be not empty'));
        }

        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getBasketItemsByUser(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async deleteBasketItemsByUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Brand.destroy({ where: { id } });
            return res.status(200).send('Successfuly deleted brand');
        } catch (e) {
            return res.status(500).send({ message: 'There was an error deleting the brand' });
        }
    }
}

module.exports = new BasketController();
