import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, setCategoryFilter, setPrimaryFilter } from '../../../store/menuSlice';
// import { setPrimaryFilter, setCategoryFilter, selectCategories } from '../../../store/menuSlice';

export const MenuFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const handlePrimaryFilterChange = (filter) => {
    dispatch(setPrimaryFilter(filter)); // Update the primary filter (All, Veg, Non-Veg)
  };

  const handleCategoryFilterChange = (category) => {
    dispatch(setCategoryFilter(category)); // Update the secondary filter (category)
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Primary Filters */}
      {['All', 'Veg', 'Non-Veg'].map(filter => (
        <button
          key={filter}
          className="btn btn-sm"
          onClick={() => handlePrimaryFilterChange(filter.toLowerCase())}
        >
          {filter}
        </button>
      ))}

      {/* Category Dropdown */}
      <select
        className="btn btn-sm"
        onChange={(e) => handleCategoryFilterChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
