import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    currentUser: null,
    error:null,
    success:null,
    loading:false

} 

const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        sinInStart:(state)=>{
            state.loading=true;
            state.success=null;
            state.error=null; //clear the previous errors

        },
        signInSuccess:(state,action)=>{   //action is like the response
            state.currentUser = action.payload; //user data is payload, exactly is data.message
                state.loading = false;
                state.success = "You are successfully signed in!";
                state.error = null;

        },
        signInFailur:(state,action)=>{
            state.loading=false;
            state.success=null;
            state.error=action.payload;
        },
        clearMessage:(state)=>{
            state.loading=null;
            state.success=null;

        },
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;

        },
        updateFailur:(state)=>{
            state.loading=false;
            state.error=action.payload;
        }



    }
})

export const {sinInStart,signInSuccess,signInFailur,clearMessage,updateStart,updateSuccess,updateFailur} =userSlice.actions
export default userSlice.reducer





/* !!!!!!!!!!code optimization
  clearMessages: (state) => {
            state.success = null;
            state.error = null;
        }
*/