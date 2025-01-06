import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuFilters } from './components/FilterComponent';
import { MenuAccordion } from './components/MenuAccordion';
import BannerComponent from './components/BannerComponent';
import CartComponent from './components/CartComponent';
import InstallPWA from './components/InstallPWA';
import { selectFilteredProducts, setProductsList } from '../../store/menuSlice';
import axios from 'axios';
import { setShopData } from '../../store/appSlice';

function HomePage() {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // shop data
    axios
      .post('https://lewoffy.infineur.com/public/api/get-restaurant-info/lewoffy')
      .then((response) => {
        console.log(response.data);
        dispatch(setShopData(response.data));
      })
      .catch((error) => {
        console.error(error);
      });

    // menu data
    setLoading(true); // Start loading
    axios
      .post('https://lewoffy.infineur.com/public/api/get-restaurant-items/lewoffy')
      .then((response) => {
        console.log(response.data);
        dispatch(setProductsList(response.data));
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // End loading on error
      });
  }, [dispatch]);

  return (
    <div className="w-full bg-white text-black">
      <InstallPWA />
      <BannerComponent />
      <div className="overflow-x-auto px-2 sticky top-0 bg-white/60 backdrop-blur-md pt-3 z-50">
        <MenuFilters />
      </div>
      <div className="max-w-[95vw] px-2 mx-auto mb-20">
        {/* <h2 className="text-2xl font-bold mb-4">Items</h2> */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="spinner-dot-circle">
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
              <div className="spinner-dot [--spinner-color:var(--pink-5)]"></div>
            </div>
          </div>
        ) : (
          Object.entries(filteredProducts).map(([categoryName, items]) => (
            <div key={categoryName}>
              <div key={categoryName} className="mt-3 min-w-full">
                <MenuAccordion category={categoryName} items={items} />
              </div>
            </div>
          ))
        )}
        {!loading && (
          <p className="text-gray-300 text-xs text-center p-10 pt-5">
            No more items
          </p>
        )}
      </div>
      <CartComponent />
    </div>
  );
}

export default HomePage;
