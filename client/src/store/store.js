import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { deviceReducer } from './slices/deviceSlice';

const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
