
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";
import type {PayloadAction} from "@reduxjs/toolkit";
import { useState } from "react";


export interface AuthState{
    user:null | User;
}
const initialState : AuthState ={
    user:null,
}

export const authSlice = createSlice({
name: "auth",
initialState,
reducers:{
    login:(state,action:PayloadAction<User>) =>{
        state.user = action.payload;
        console.log(state.user, 'hey');
    },
    logout: (state) => {
        state.user = null;
    }

}

})

export const {login, logout} = authSlice.actions; 

export default authSlice.reducer;