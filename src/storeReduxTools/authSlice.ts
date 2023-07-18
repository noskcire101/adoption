
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase";


interface User{
    id:string;
    fullName:string | null;
    email:string; 
    photoUrl:string |null;
    
}
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
    },
    logout: (state) => {
        state.user = null;
         signOut(auth);
    }

}

})

export const {login, logout} = authSlice.actions; 

export default authSlice.reducer;