import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsList: [], // Original API data
  filteredProducts: [], // List of products after applying filters
  selectedPrimaryFilter: '', // 'all', 'veg', 'nonVeg'
  selectedCategoryFilter: '', // Selected category for secondary filtering
  categories: [], // List of category names extracted from API
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload.items; // Save the API items
      state.categories = Object.keys(action.payload.items); // Extract categories
      state.filteredProducts = action.payload.items; // Default: show all
    },
    setPrimaryFilter: (state, action) => {
      state.selectedPrimaryFilter = action.payload;
      const filteredByPrimary = applyPrimaryFilter(state.productsList, state.selectedPrimaryFilter);
      state.filteredProducts = applyCategoryFilter(filteredByPrimary, state.selectedCategoryFilter);
    },
    setCategoryFilter: (state, action) => {
      state.selectedCategoryFilter = action.payload;
      const filteredByPrimary = applyPrimaryFilter(state.productsList, state.selectedPrimaryFilter);
      state.filteredProducts = applyCategoryFilter(filteredByPrimary, state.selectedCategoryFilter);
    },
  },
});

const applyPrimaryFilter = (products, filter) => {
  if (!filter || filter === 'all') return products;
  const filtered = {};
  for (const category in products) {
    filtered[category] = products[category].filter(item => 
      filter === 'veg' ? item.is_veg : !item.is_veg
    );
  }
  return filtered;
};

const applyCategoryFilter = (products, categoryFilter) => {
  if (!categoryFilter) return products;
  return { [categoryFilter]: products[categoryFilter] || [] };
};

export const { setProductsList, setPrimaryFilter, setCategoryFilter } = menuSlice.actions;

export const selectFilteredProducts = state => state.menu.filteredProducts;
export const selectCategories = state => state.menu.categories;

export default menuSlice.reducer;
