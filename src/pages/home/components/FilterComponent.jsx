import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProducts, setSelectedFilter } from '../../../store/menuSlice';


export const MenuFilters = ({onFilterChange}) => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.menu.selectedFilter);

  const handleFilterChange = (filter) => {
    dispatch(setSelectedFilter(filter)); // Update the selected filter in Redux
    dispatch(setFilteredProducts()); // Reapply the filtering logic based on selected filter
  };

  return (
    <div className="flex gap-2 mb-4">
      {[
        { label: 'All', value: '' },
        { label: 'Veg', value: 'veg' },
        { label: 'Non-Veg', value: 'nonVeg' },
        { label: 'Best Seller', value: 'bestSeller' },
        { label: 'Special', value: 'special' }
      ].map((filter) => (
        <button
          key={filter.value}
          className={`btn btn-sm ${selectedFilter === filter.value ? 'btn-warning' : 'btn-outline'} whitespace-nowrap`}
          onClick={() => handleFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
