import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

// localStorage.setItem('user', JSON.stringify({}));


const initialState: any  = {
    token: JSON.parse(localStorage.getItem('token') ?? "null"),
    user: JSON.parse(localStorage.getItem('user') ?? '{ "isAuth": false}'), 
}


export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            state.token = action.payload.token;
            state.user = {...jwt_decode(action.payload.token), isAuth: true};
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            localStorage.setItem('user', JSON.stringify({...jwt_decode(action.payload.token), isAuth: true}));
        },
        logOut: (state, action: PayloadAction<any>) => {
            state.token = '';
            state.user = {};
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
})


export const authActions = auth.actions;
export const authReducer = auth.reducer;
