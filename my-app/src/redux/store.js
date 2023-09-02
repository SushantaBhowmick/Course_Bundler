import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducers';


const store = configureStore({
    reducer:{
        user: userReducer
    }
})

export default store;

export const server = 'https://course-bundler-pi.vercel.app/api/v1'