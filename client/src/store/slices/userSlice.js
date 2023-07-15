import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    // extraReducers: {
    //     [fetchUserById.fullfilled]: (state, action) => {
    //         state.entries.push(action.payload);
    //     },
    // },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;