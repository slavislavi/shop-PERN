import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { deviceReducer } from './slices/deviceSlice';
import { notificationReducer } from './slices/notificationSlice';

const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
    notification: notificationReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
