import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: [],
    selectedType: {},
    brands: [],
    selectedBrand: {},
    devices: []
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
            state.selectedType = action.payload;
        },
        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
        },
    },
});

export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
