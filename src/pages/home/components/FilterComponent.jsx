import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, setCategoryFilter, setPrimaryFilter } from '../../../store/menuSlice';

export const MenuFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [activePrimaryFilter, setActivePrimaryFilter] = React.useState('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState('All');

  const handlePrimaryFilterChange = (filter) => {
    setActivePrimaryFilter(filter)
    dispatch(setPrimaryFilter(filter));
  };

  const handleCategoryFilterChange = (category) => {
    if (category == "All") {
      setActiveCategoryFilter('All')
      dispatch(setCategoryFilter(''));
    } else {
      setActiveCategoryFilter(category)
      dispatch(setCategoryFilter(category));
    }
  };

  return (
    <>
      {/* Primary Filters */}
      {/* <div className="flex flex-wrap gap-2 overflow-x-auto hide-scrollbar mb-4">
        {['All', 'Veg', 'Non-Veg'].map((filter) => (
          <button
            key={filter}
            className={`btn btn-sm ${activePrimaryFilter === filter.toLowerCase() ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            onClick={() => handlePrimaryFilterChange(filter.toLowerCase())}
          >
            {filter}
          </button>
        ))}
      </div> */}
      <div className='w-full'>
        {/* Category Dropdown */}
        {/* <select
          className="btn btn-sm w-full bg-main-color text-white"
          onChange={(e) => handleCategoryFilterChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> */}
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
        <button
          key={'All'}
          className={`btn sticky left-0 z-20 btn-sm  text-nowrap ${activeCategoryFilter === "All" ? 'bg-main-color text-white' : 'bg-gray-200 btn-outline border-main-color text-gray-800'}`}
          onClick={() => handleCategoryFilterChange("All")}
        >
          All
        </button>
        {[...categories].map((category) => (
          <button
            key={category}
            className={`btn btn-sm text-nowrap ${activeCategoryFilter === category ? 'bg-main-color text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleCategoryFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};
