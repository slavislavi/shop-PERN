const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        const { name } = req.body;
        const isExist = await Type.findOne({ where: { name } });

        if (isExist) {
            return next(ApiError.badRequest('Type with this name already exists'));
        }

        const type = await Type.create({ name });
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async update(req, res) {
        const { id, name } = req.body;
        const type = await Type.update({
            name: name,
        },
            {
                where: { id }
            });
        res.json(type);
    }

    async delete(req, res) {
        const { id } = req.body;
        const type = await Type.destroy({ where: { id } });
        return res.json(type);
    }
}

module.exports = new TypeController();
