const ApiError = require('../error/ApiError');
const { Brand } = require('../models/models');

class BrandController {
    async create(req, res, next) {
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

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Brand.findOne({ where: { id } }).then(async (data) => {
                if (data) {
                    await Brand.destroy({ where: { id } }).then(() => {
                        return res.status(200).send('Successfuly deleted brand');
                    });
                } else {
                    return res.status(500).send('There is no such brand in the database');
                }
            });
        } catch (e) {
            return res.status(500).send({ message: 'There was an error deleting the brand' });
        }
    }
}

module.exports = new BrandController();
