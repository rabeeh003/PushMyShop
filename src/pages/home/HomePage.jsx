import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsList, setSelectedFilter, setFilteredProducts } from '../../store/menuSlice';
import { selectFilteredProducts } from '../../store/menuSlice';
import { MenuFilters } from './components/FilterComponent';
import { MenuAccordion } from './components/MenuAccordion';
import BannerComponent from './components/BannerComponent';
import CartComponent from './components/CartComponent';
import dummyProducts from './components/dummyProducts.json';
import InstallPWA from './components/InstallPWA';

function HomePage() {
  const dispatch = useDispatch();
  const filteredCategoriyProductList = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(setProductsList(dummyProducts)); // Dispatch the products list to Redux
  }, [dispatch]);

  // Handle filter change (this will update the selectedFilter in Redux)
  const handleFilterChange = (filter) => {
    dispatch(setSelectedFilter(filter)); // Update selected filter in Redux
    dispatch(setFilteredProducts()); // Reapply filters based on the selected filter
  };

  return (
    <div className="w-full">
      <InstallPWA/>
      <BannerComponent />
      <div className="overflow-x-auto px-2 sticky top-0 bg-white/60 dark:bg-inherit backdrop-blur-md pt-3 z-50">
        <MenuFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="max-w-[95vw] px-2">
        {filteredCategoriyProductList.map((category) => (
          <div key={category.categoryName}>
            <h2 className="text-2xl font-bold mb-4">{category.categoryName}</h2>
            {category.subCategories.map((subCategory) => (
              <div key={subCategory.subCategoryName} className="mt-3 min-w-full">
                <MenuAccordion
                  category={subCategory.subCategoryName}
                  items={subCategory.products}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <CartComponent />
    </div>
  );
}

export default HomePage;
