import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    message: '',
    variant: 'light'
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.variant = action.payload.variant;
        },
    },
});

export const { actions: notificationActions } = notificationSlice;
export const { reducer: notificationReducer } = notificationSlice;
