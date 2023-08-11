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

    async getOne(req, res) {
        const { id } = req.params;
        const type = await Type.findOne(
            {
                where: { id },
            }
        );

        return res.json(type);
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
        try {
            const { id } = req.params;
            const deleted = await Type.destroy({ where: { id } });
            return res.status(200).send('Successfuly deleted type');
        } catch (e) {
            return res.status(500).send({ message: 'There was an error deleting the type' });
        }
    }
}

module.exports = new TypeController();
