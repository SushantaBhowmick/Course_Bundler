import {createReducer} from '@reduxjs/toolkit'

export const courseReducer = createReducer({courses:[]},{
    allCourseRequest:(state)=>{
        state.loading = true;
    },
    allCourseSuccess:(state,action)=>{
        state.loading = false;
        state.courses = action.payload;
    },
    allCourseFail:(state,action)=>{
        state.loading = false;
        state.error= action.payload;

    },


    addToPlaylistRequest:(state)=>{
        state.loading = true;
    },
    addToPlaylistSuccess:(state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    addToPlaylistFail:(state,action)=>{
        state.loading = false;
        state.error= action.payload;

    },
    
    
    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message= null;
    }

})

export const subscriptionReducer = createReducer({},{

    buySubcriptionRequest:(state)=>{
        state.loading = true;
    },
    buySubcriptionSuccess:(state,action)=>{
        state.loading = false;
        state.subcriptionId = action.payload;
    },
    buySubcriptionFail:(state,action)=>{
        state.loading = false;
        state.error= action.payload;
    },
    
    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message= null;
    }

})