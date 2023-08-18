const ApiError = require('../error/ApiError');
const { Brand } = require('../models/models');

class BrandController {
    async create(req, res, next) {
        const { name } = req.body;
        const isExist = await Brand.findOne({ where: { name } });

        if (isExist) {
            return next(ApiError.badRequest('Brand with this name already exists'));
        }

        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const brand = await Brand.findOne(
            {
                where: { id },
            }
        );

        return res.json(brand);
    }

    async update(req, res) {
        const { id, name } = req.body;
        const brand = await Brand.update({
            name: name,
        },
            {
                where: { id }
            });
        res.json(brand);
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Brand.destroy({ where: { id } });
            return res.status(200).send('Successfuly deleted brand');
        } catch (e) {
            return res.status(500).send({ message: 'There was an error deleting the brand' });
        }
    }
}

module.exports = new BrandController();
