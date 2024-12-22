import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from '../../../store/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Find the item in the cart to get the current quantity
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  // Event Handlers
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      dispatch(increaseQuantity(item.id));
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };

  return (
    <div className="flex justify-between items-start p-4 border-b dark:border-gray-700">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <h3 className="text-lg font-semibold">{item.name}</h3>
        </div>
        <div className="mb-2">
          <span className="text-warning font-semibold">AED {item.price}</span>
          {item.old_price > 0 && item.price < item.old_price && (
            <span className="text-gray-500 ml-2 line-through">AED {item.old_price}</span>
          )}
        </div>
        <p className="text-sm text-gray-600">{item.desc}</p>
      </div>
      <div className="ml-4 flex flex-col items-center">
        <img
          src={
            item.image && item.image.length > 0
              ? 'https://app.mojarestaurant.com/' + item.image
              : '/placeholder.png'
          }
          alt={item.name}
          className="w-24 h-24 rounded-lg object-cover mt-5"
        />
        {quantity > 0 ? (
          <div className="flex items-center mt-2">
            {/* Quantity Controls */}
            <button
              onClick={handleDecreaseQuantity}
              className="p-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              {quantity === 1 ? (
                <Trash2 className="w-4 h-4 text-red-600" />
              ) : (
                <Minus className="w-4 h-4 text-gray-500" />
              )}
            </button>
            <span className="px-4 font-semibold">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 btn btn-solid-warning -mt-5 rounded-lg transition"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};
