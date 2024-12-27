import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

const ItemModal = ({ food, quantity, onClose, onDecrease, onIncrease, onAdd }) => {
  const handleOutsideClick = (e) => {
    // Check if the click is outside the modal content
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
      onClick={handleOutsideClick} // Detect outside clicks
    >
      <div className="bg-white rounded-t-2xl shadow-lg max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Image */}
        <img
          src={
            food.image && food.image.length > 0
              ? "https://lewoffy.infineur.com/" + food.image
              : "/placeholder.png"
          }
          alt={food.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />

        {/* Content */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{food.name}</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-warning font-semibold text-lg">AED {food.price}</span>
              {food.old_price > 0 && food.price < food.old_price && (
                <span className="text-gray-500 ml-2 line-through">AED {food.old_price}</span>
              )}
            </div>
          </div>
          {/* Quantity Controls */}
          <div className="flex items-start justify-between">
            {quantity > 0 ? (
              <div className="flex items-center border border-warning outline-warning bg-warning/50 rounded-lg">
                <button
                  onClick={onDecrease}
                  className="px-1 btn bg-transparent hover:bg-transparent/10"
                >
                  {quantity === 1 ? (
                    <Trash2 className="w-4 h-4 text-red-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-white" />
                  )}
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={onIncrease}
                  className="px-1 btn bg-transparent hover:bg-transparent/10"
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="px-4 py-2 btn btn-outline-warning bg-warning/50 text-white rounded-lg transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                ADD
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">{food.desc}</p>
      </div>
    </div>
  );
};

export default ItemModal;
