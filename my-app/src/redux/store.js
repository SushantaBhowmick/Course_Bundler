import {configureStore} from '@reduxjs/toolkit';
import { profileReducer, userReducer } from './reducers/userReducers';
import { courseReducer, subscriptionReducer } from './reducers/courseReducers';


// let initialState = {
//     user:{
//         user:localStorage.
//     }
// }

const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer,
        course: courseReducer,
        subcription:subscriptionReducer,
    }
})

export default store;

// export const server = 'https://ecommerce-jfiz.onrender.com/api/v1'
export const server = 'https://course-bundler-phi.vercel.app/api/v1'
// export const server = 'http://localhost:4000/api/v1'