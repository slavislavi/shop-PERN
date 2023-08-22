export const getTypes = (state) => state.device.types || [];

export const getSelectedType = (state) => state.device.selectedType || {};

export const getBrands = (state) => state.device.brands || [];

export const getSelectedBrand = (state) => state.device.selectedBrand || {};

export const getDevices = (state) => state.device.devices || [];

export const getPage = (state) => state.device.page || 1;

export const getTotalCount = (state) => state.device.totalCount;

export const getLimit = (state) => state.device.limit;

export const getBasketItems = (state) => state.device.basketItems || [];
