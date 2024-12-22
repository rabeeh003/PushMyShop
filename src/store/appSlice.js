import { createSlice } from '@reduxjs/toolkit';

// Initial state for the appSlice
const initialState = {
    userData: null, // To store user data
    shopData: null, // To store shop data (app data)
    loading: false, // To manage loading state
    error: null, // For any errors that occur during fetching
};

// Create a slice for app
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Action to set user data
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        // Action to set shop data
        setShopData: (state, action) => {
            state.shopData = action.payload;
        },
        // Action to set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Action to set error state
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export actions
export const { setUserData, setShopData, setLoading, setError } = appSlice.actions;

export const selectUserData = (state) => state.app.userData;
export const selectShopData = (state) => state.app.shopData;


// Reducer export
export default appSlice.reducer;
