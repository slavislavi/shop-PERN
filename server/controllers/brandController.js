const { Brand } = require('../models/models');

class BrandController {
    async create(req, res) {
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
        const { id } = req.body;
        const brand = await Brand.destroy({ where: { id } });
        return res.json(brand);
    }
}

module.exports = new BrandController();
