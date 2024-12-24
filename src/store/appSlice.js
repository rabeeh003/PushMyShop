import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  locations: [], // Stores user locations
  currentDeliveryLocation: null, // Current selected delivery location
  shopData: null,
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setShopData: (state, action) => {
      state.shopData = action.payload;
    },
    setLocations: (state, action) => {
      if (!Array.isArray(state.locations)) {
        state.locations = [];
      }
      const newLocations = Array.isArray(action.payload) ? action.payload : [action.payload];
      const uniqueLocations = newLocations.filter(
        (newLocation) =>
          !state.locations.some(
            (location) => location.lat === newLocation.lat && location.lng === newLocation.lng
          )
      );
      state.locations = [...state.locations, ...uniqueLocations];
    },
    setCurrentDeliveryLocation: (state, action) => {
      state.currentDeliveryLocation = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAppState: () => initialState,
  },
});

export const {
  setUserData,
  setShopData,
  setLocations,
  setCurrentDeliveryLocation,
  setLoading,
  setError,
  clearAppState,
} = appSlice.actions;

export const selectUserData = (state) => state.app.userData;
export const selectShopData = (state) => state.app.shopData;
export const selectLocations = (state) => state.app.locations;
export const selectCurrentDeliveryLocation = (state) => state.app.currentDeliveryLocation;
export const selectLoading = (state) => state.app.loading;
export const selectError = (state) => state.app.error;

export default appSlice.reducer;
