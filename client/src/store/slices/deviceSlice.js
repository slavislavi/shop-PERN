import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: [],
    selectedType: {},
    brands: [],
    selectedBrand: {},
    devices: [],
    page: 1,
    totalCount: 0,
    limit: 8,
    basketItems: []
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setTypes: (state, action) => {
            state.types = action.payload;
        },
        setBrands: (state, action) => {
            state.brands = action.payload;
        },
        setDevices: (state, action) => {
            state.devices = action.payload;
        },
        setSelectedType: (state, action) => {
            state.page = 1;
            state.selectedType = action.payload;
        },
        setSelectedBrand: (state, action) => {
            state.page = 1;
            state.selectedBrand = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setBasketItems: (state, action) => {
            state.basketItems = action.payload;
        },
    },
});

export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
