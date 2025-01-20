import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    success: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.success = null;
            state.error = null;
            state.loading = false;
        },
        signInStart: (state) => {
            state.loading = true;
            state.success = null;
            state.error = null; // Clear previous errors
        },
        signInSuccess: (state, action) => {
            console.log("Sign In Payload:", action.payload); // Debugging log
            state.currentUser = action.payload;
            state.loading = false;
            state.success = "You are successfully signed in!";
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload;
        },
        clearStatus: (state) => {
            state.success = null;
            state.error = null;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.success = "User deleted successfully!";
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.success = "You have successfully signed out.";
        },
    },
});

export const {
    clearMessage,
    signInStart,
    signInSuccess,
    signInFailure,
    clearStatus,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
