import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: [
        { id: 1, name: 'Mobile phone' },
        { id: 2, name: 'Laptop' },
        { id: 3, name: 'Fridge' },
    ],
    selectedType: {},
    brands: [
        { id: 1, name: 'Samsung' },
        { id: 2, name: 'LG' },
        { id: 3, name: 'Apple' },
    ],
    devices: [
        { id: 1, name: 'Apple iphone 14 pro', price: 1400, rating: 5, img: 'https://img.5element.by/import/images/ut/goods/good_077c5dc7-06a8-11ee-bb93-005056012465/-1_600.jpg' },
        { id: 2, name: 'Samsung Galaxy Z4', price: 1400, rating: 5, img: 'https://img.5element.by/import/images/ut/goods/good_9ce74b98-a3b6-11ed-bb92-005056012465/sm-s918bzkgcau-chernyy-256gb-telefon-gsm-samsung-galaxy-s23ultra-1_600.jpg' },
        { id: 3, name: 'LG freezer GC-5104', price: 1400, rating: 5, img: 'https://img.5element.by/import/images/ut/goods/good_1b36701d-f8af-11ed-bb91-005056012464/ga-b509caqm-holodilnik-lg-1_600.jpg' },
        { id: 4, name: 'Apple Macbook 16 M1max', price: 1400, rating: 5, img: 'https://img.5element.by/import/images/ut/goods/good_55640044-8044-11ed-bb97-0050560120e8/-1_600.jpg' },
    ]
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
    },
});

export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
