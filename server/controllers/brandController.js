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
}

module.exports = new BrandController();
