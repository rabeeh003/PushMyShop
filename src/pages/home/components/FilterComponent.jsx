import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, setCategoryFilter, setPrimaryFilter } from '../../../store/menuSlice';

export const MenuFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [activePrimaryFilter, setActivePrimaryFilter] = React.useState('all');

  const handlePrimaryFilterChange = (filter) => {
    setActivePrimaryFilter(filter)
    dispatch(setPrimaryFilter(filter));
  };

  const handleCategoryFilterChange = (category) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 overflow-x-auto hide-scrollbar">
        {/* Primary Filters */}
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
      </div>
      <div className='w-full mt-4'>
        {/* Category Dropdown */}
        <select
          className="btn btn-sm w-full bg-yellow-500 text-white"
          onChange={(e) => handleCategoryFilterChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
