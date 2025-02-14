import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} from "../../../store/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { selectCurrentDeliveryLocation } from "../../../store/appSlice"; // Removed unused selectShopData
import "react-toastify/dist/ReactToastify.css";

function BottumComponent({ isDeliveryAvailable, totalPrice, isShopOpened }) {
  const navigate = useNavigate();
  const totalItems = useSelector(selectCartItems);
  const location = useSelector(selectCurrentDeliveryLocation);

  // Fixed shop data for testing
  const shopData = {
    latitude: "25.276987",
    longitude: "55.296249",
    delivery_radius: "200", // Delivery radius in kilometers
  };

  // Haversine formula for distance calculation

  const toCheckOut = () => {
    if (!location) {
      toast.error("Please choose a location for delivery");
    } else if (!isDeliveryAvailable) {
      toast.error(
        `Delivery is not available at your location. Our delivery radius is ${shopData.delivery_radius} km.`
      );
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="fixed sm:max-w-[560px] bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg ">
      {/* Price and Item Count */}
      {isDeliveryAvailable == false || isShopOpened == false ? (
        <div className="my-2 flex justify-center items-center text-red-500 font-bold text-center bg-white rounded-md py-2 my-3">
          {isShopOpened == false
            ? "Delivery not available, Shop is closed at the moment"
            : "Delivery not available, You are out of our delivery area"}
        </div>
      ) : null}
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold ">AED {totalPrice}</p>
          <p className="text-sm">
            {totalItems?.length} {totalItems?.length === 1 ? "item" : "items"}{" "}
            Added
          </p>
        </div>
        {/* View Cart Button */}
        <button
          onClick={toCheckOut}
          disabled={!isDeliveryAvailable}
          className={`btn ${
            isDeliveryAvailable ? "bg-white text-main-color" : "bg-black"
          }  text-sm font-semibold py-2 px-4 rounded-md shadow`}
        >
          {isDeliveryAvailable ? "Order" : "Delivery Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default BottumComponent;
