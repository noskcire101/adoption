
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
name: "authUser",
initialState,
    reducers:{
        login:{
            reducer(state,action){
            state.user = action.payload
            },
            prepare(id:any,fullName?:any,email:any,photoUrl?:any){
                return{
                    payload:{
                        id,fullName,email,photoUrl
                    }
                }
            }
            
        },
        logout: (state) => {
            state.user = null;
            signOut(auth);
        },

    }

})

export const {login, logout} = authSlice.actions; 

export default authSlice.reducer;