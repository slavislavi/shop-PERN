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

export const updateType = async (id, type) => { // NOT SURE NOT SURE NOT SURE
    const { data } = await $authHost.put(`api/type/${id}`, type);
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

export const updateBrand = async (id, brand) => { // NOT SURE NOT SURE NOT SURE
    const { data } = await $authHost.put(`api/brand/${id}`, brand);
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

export const updateDevice = async (id, device) => { // NOT SURE NOT SURE NOT SURE
    const { data } = await $authHost.put(`api/device/${id}`, device);
    return data;
};

export const deleteDevice = async (id) => {
    const { data } = await $authHost.delete(`api/device/${id}`);
    return data;
};
