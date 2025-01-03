import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../../../store/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import ItemModal from "./ItemModel";

export const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-start p-4 border-b dark:border-gray-300">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {/* <span
              className={`w-2 h-2 rounded-full ${item.is_veg ? "bg-green-500" : "bg-red-500"}`}
            /> */}
            <h3 className="text-lg font-semibold cursor-pointer" onClick={handleOpenModal}>
              {item.name}
            </h3>
          </div>
          <div className="mb-2">
            <span className="text-main-color font-semibold">AED {item.price}</span>
            {item.old_price > 0 && item.price < item.old_price && (
              <span className="text-gray-500 ml-2 line-through">AED {item.old_price}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
        </div>
        <div className="ml-4 flex flex-col items-center">
          <img
            src={
              item.image && item.image.length > 0
                ? "https://lewoffy.infineur.com/" + item.image
                : "/placeholder.png"
            }
            alt={item.name}
            className="w-24 h-24 rounded-lg object-cover mt-5 cursor-pointer"
            onClick={handleOpenModal}
          />
          {quantity > 0 ? (
            <div className="flex items-center -mt-5 border-2 shadow-sm outline-white bg-main-color/50 rounded-lg">
              <button
                onClick={handleDecreaseQuantity}
                className="px-1 btn bg-transparent hover:bg-transparent/10"
              >
                {quantity === 1 ? (
                  <Trash2 className="w-4 h-4 text-red-600" />
                ) : (
                  <Minus className="w-4 h-4 text-white" />
                )}
              </button>
              <span className="px-4 text-white font-semibold">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-1 btn bg-transparent hover:bg-transparent/10"
                disabled={quantity >= 10}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 btn border-2  outline-white shadow-sm bg-main-color/50 text-white -mt-5 rounded-lg transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              ADD
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ItemModal
          food={item}
          quantity={quantity}
          onClose={handleCloseModal}
          onDecrease={handleDecreaseQuantity}
          onIncrease={handleIncreaseQuantity}
          onAdd={handleAddToCart}
        />
      )}
    </>
  );
};
