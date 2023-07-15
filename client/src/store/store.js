import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
    user: userReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
