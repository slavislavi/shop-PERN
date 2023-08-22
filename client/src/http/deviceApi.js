import { $authHost, $host } from "./index";

// TYPES

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

export const deleteType = async (id) => {
    const { data } = await $authHost.delete(`api/type/${id}`);
    return data;
};

// BRANDS

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand);
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand');
    return data;
};

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete(`api/brand/${id}`);
    return data;
};

// DEVICES

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device);
    return data;
};

export const fetchDevices = async (typeId, brandId, page, limit, isAdminList) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit, isAdminList
        }
    });
    return data;
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get(`api/device/${id}`);
    return data;
};

export const deleteDevice = async (id) => {
    const { data } = await $authHost.delete(`api/device/${id}`);
    return data;
};

// BASKET

export const addToBasket = async (deviceId) => {
    const { response } = await $authHost.post('api/basket', deviceId);
    return response;
};

export const deleteFromBasket = async (deviceId) => {
    const { response } = await $authHost.delete(`api/device/${deviceId}`);
    return response;
};

export const getBasket = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
};
