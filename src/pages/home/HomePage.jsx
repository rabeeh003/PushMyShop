import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuFilters } from './components/FilterComponent';
import { MenuAccordion } from './components/MenuAccordion';
import BannerComponent from './components/BannerComponent';
import CartComponent from './components/CartComponent';
import dummyProducts from './components/dummyProducts.json';
import InstallPWA from './components/InstallPWA';
import { selectFilteredProducts, setProductsList } from '../../store/menuSlice';
import axios from 'axios';

function HomePage() {
  const dispatch = useDispatch();
  // const filteredCategoriyProductList = useSelector(selectFilteredProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    axios.post('https://app.mojarestaurant.com/public/api/get-restaurant-items/our-menu').then(response => {
      console.log(response.data);
      dispatch(setProductsList(response.data));
    }).catch(error => {
      console.error(error);
    });
    // dispatch(setProductsList(dummyProducts)); // Dispatch the products list to Redux
  }, [dispatch]);

  return (
    <div className="w-full">
      <InstallPWA />
      <BannerComponent />
      <div className="overflow-x-auto px-2 pb-2 sticky top-0 bg-white/60 dark:bg-inherit backdrop-blur-md pt-3 z-50">
        <MenuFilters />
      </div>
      <div className="max-w-[95vw] px-2 mx-auto mb-20 mt-3">
        <h2 className="text-2xl font-bold mb-4">Items</h2>
        {Object.entries(filteredProducts).map(([categoryName, items]) => (
          <div key={categoryName}>
            {/* {category.subCategories.map((subCategory) => ( */}
              <div key={categoryName} className="mt-3 min-w-full">
                <MenuAccordion
                  category={categoryName}
                  items={items}
                />
              </div>
            {/* ))} */}
          </div>
        ))}
      </div>
      <CartComponent />
    </div>
  );
}

export default HomePage;
