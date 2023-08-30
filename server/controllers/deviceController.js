const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Device, DeviceInfo, Type, Brand } = require('../models/models');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            if (!(name.trim().length)) {
                return next(ApiError.badRequest('Name must be not empty'));
            }

            const device = await Device.create({ name, price, brandId, typeId, info, img: fileName });

            if (info) {
                const infoJson = JSON.parse(info);
                infoJson.forEach(i => DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                }));
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page, isAdminList } = req.query;
        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;
        let devices;

        if (isAdminList) {
            page = undefined;
            limit = undefined;
            devices = await Device.findAll();
        }

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({
                limit, offset, include: [
                    { model: Type, as: 'type' },
                    { model: Brand, as: 'brand' },
                    { model: DeviceInfo, as: 'info' }
                ],
                distinct: true
            });
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: { brandId }, limit, offset, include: [
                    { model: Type, as: 'type' },
                    { model: Brand, as: 'brand' },
                    { model: DeviceInfo, as: 'info' }
                ],
                distinct: true
            });
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId }, limit, offset, include: [
                    { model: Type, as: 'type' },
                    { model: Brand, as: 'brand' },
                    { model: DeviceInfo, as: 'info' }
                ],
                distinct: true
            });
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { brandId, typeId }, limit, offset, include: [
                    { model: Type, as: 'type' },
                    { model: Brand, as: 'brand' },
                    { model: DeviceInfo, as: 'info' }
                ],
                distinct: true
            });
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            },
        );

        return res.json(device);
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Device.findOne({ where: { id } }).then(async (data) => {
                if (data) {
                    await Device.destroy({ where: { id } }).then(() => {
                        res.status(200).send('Successfuly deleted device');
                    });
                } else {
                    res.status(500).send('There is no such device in the database');
                }
            });
        } catch (e) {
            return res.status(500).send({ message: 'There was an error deleting the device' });
        }
    }
}

module.exports = new DeviceController();
