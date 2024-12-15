import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    currentUser: null,
    error:null,
    loading:false

} 

const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        sinInStart:(state)=>{
            state.loading=true,
            state.error=null //clear the previous errors

        },
        signInSuccess:(state,action)=>{   //action is like the response
            state.currentUser= action.payload,  //user data is payload
            state.loading= false,
            state.error= null

        },
        signInFailur:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }


    }
})

export const {sinInStart,signInSuccess,signInFailur} =userSlice.actions
export default userSlice.reducer