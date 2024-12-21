import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsList: [], // List of all products (initially empty or API data)
  categoriesProductList: [], // List of products categorized by categories and subcategories
  filteredCategoriyProductList: [], // Filtered products list after applying category, subcategory, and filter
  selectedFilter: '', // No filter applied initially, will be used to filter by veg, non-veg, etc.
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload; // Store the product list from API
      // Initialize categoriesProductList based on the new products list
      const categories = [];
      
      // Group products by category and subcategory
      action.payload.forEach((product) => {
        let category = categories.find(c => c.categoryName === product.category);
        if (!category) {
          category = { categoryName: product.category, subCategories: [] };
          categories.push(category);
        }
        
        let subCategory = category.subCategories.find(sc => sc.subCategoryName === product.subcategory);
        if (!subCategory) {
          subCategory = { subCategoryName: product.subcategory || "Others", products: [] };
          category.subCategories.push(subCategory);
        }

        subCategory.products.push(product);
      });

      state.categoriesProductList = categories;
      state.filteredCategoriyProductList = categories; // Initially, show all products
    },
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload; // Update the selected filter
    },
    setFilteredProducts: (state) => {
      let filteredList = state.categoriesProductList;

      // Apply filter based on the selected filter value (veg, non-veg, special, best-seller)
      if (state.selectedFilter) {
        filteredList = filteredList.map(category => {
          return {
            ...category,
            subCategories: category.subCategories.map(subCategory => {
              return {
                ...subCategory,
                products: subCategory.products.filter(product => {
                  if (state.selectedFilter === 'veg') {
                    return product.isVegetarian;
                  } else if (state.selectedFilter === 'nonVeg') {
                    return !product.isVegetarian;
                  } else if (state.selectedFilter === 'bestSeller') {
                    return product.isBestSeller;
                  } else if (state.selectedFilter === 'special') {
                    return product.isSpecial;
                  }
                  return true; // Default, no filter applied
                })
              };
            })
          };
        });
      }

      state.filteredCategoriyProductList = filteredList; // Update the filtered list with the applied filters
    },
  },
});

// Export actions and selectors
export const { setProductsList, setSelectedFilter, setFilteredProducts } = menuSlice.actions;

// Selectors
export const selectFilteredProducts = (state) => state.menu.filteredCategoriyProductList;
export const selectAllProducts = (state) => state.menu.products;

export default menuSlice.reducer;
