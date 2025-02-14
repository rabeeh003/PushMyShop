import React, { useState, useEffect } from "react";
import BottumComponent from "./components/BottumComponent";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectTotalPrice,
} from "../../store/cartSlice";
import {
  selectCurrentDeliveryLocation,
  selectShopData,
} from "../../store/appSlice";
import DeliveryLocationCard from "./components/DeliveryLocationCard";
import axios from "axios";

function CartPage() {
  const dispatch = useDispatch();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false); // Loading state
  const [isShopOpened, setIsShopOpened] = useState(false); // Loading state

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const shopData = useSelector(selectShopData);
  const currentDeliveryLocation = useSelector(selectCurrentDeliveryLocation);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id)); // Remove item if quantity is 1
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  useEffect(() => {
    // console.log(currentDeliveryLocation);
    handleChangeAddress();
  }, []);

  useEffect(() => {
    calculateDeliveryCharge();
  }, []);

  const handleChangeAddress = () => {
    setLoading(true); // Start loading

    axios
      .post("https://lewoffy.infineur.com/public/api/get-customer-distance", {
        slug: shopData?.slug,
        latitude: currentDeliveryLocation?.latitude,
        longitude: currentDeliveryLocation?.longitude,
      })
      .then((response) => {
        const data = response?.data;
        setDistance(data?.distance);
        setIsDeliveryAvailable(data?.is_deliverable);
        setIsShopOpened(data?.shop_opened);

        calculateDeliveryCharge();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calculateDeliveryCharge = () => {
    if (distance > shopData.base_delivery_distance) {
      const extraDistance = distance - shopData.base_delivery_distance;
      console.log("Extra Distance:", extraDistance, "km");

      const extraCharge =
        (extraDistance / shopData.extra_delivery_distance) *
        shopData.extra_delivery_charge;
      console.log("Extra Charge:", extraCharge);

      let dynamicCharge =
        parseFloat(shopData.base_delivery_charge) + parseFloat(extraCharge);
      console.log("Total Charge:", dynamicCharge);

      if (localStorage.getItem("enDelChrRnd") === "true") {
        dynamicCharge = Math.ceil(dynamicCharge);
      }

      setDeliveryCharge(dynamicCharge);
    } else {
      setDeliveryCharge(shopData.base_delivery_charge);
    }

    setLoading(false);
  };
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Header */}
      <div className="flex items-center justify-center h-14 w-full sticky top-0 bg-white/60 backdrop-blur-md pt-3 ">
        <Link to="/">
          <ChevronLeft className="absolute left-3 top-4 w-6 h-6" />
        </Link>
        <span className="text-center text-xl font-semibold">Lewoffy</span>
      </div>

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
        <>
          {cartItems.length > 0 ? (
            <>
              <section className="px-4">
                {/* Cart Section */}
                <div className="pb-3">
                  <span className="text-center text-lg font-semibold">
                    Your Cart
                  </span>
                  <div>
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item py-2 border-b">
                        <div className="flex items-center">
                          <img
                            src={
                              item.image && item.image.length > 0
                                ? "https://lewoffy.infineur.com/" + item.image
                                : "/placeholder.png"
                            }
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {item.category_name}
                            </p>
                            <div className="flex items-center mt-2">
                              {/* Quantity Controls */}
                              <button
                                onClick={() =>
                                  handleDecreaseQuantity(item.id, item.quantity)
                                }
                                className="p-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                              >
                                {item.quantity === 1 ? (
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                ) : (
                                  <Minus className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              <span className="px-4 font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  item.quantity < 10 &&
                                  handleIncreaseQuantity(item.id)
                                }
                                className="p-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                                disabled={item.quantity >= 10}
                              >
                                <Plus className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-10 items-end mt-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.is_veg ? "bg-green-500" : "bg-red-500"
                              }`}
                            />
                            <span className="text-sm font-semibold">
                              AED {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Bill Details */}
                <span className="text-center text-lg font-semibold">
                  Bill Details
                </span>
                <div className="relative p-4 bg-gray-200 rounded-lg shadow-sm my-3">
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semibold">Subtotal</span>
                    <span className="text-sm">AED {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">
                        Delivery Charge
                      </span>
                      {/* <span className="text-[10px] md:text-xs font-extralight">
                        Save AED {shopData?.delivery_charges} on Delivery fee by
                        ordering above AED 30
                      </span> */}
                    </div>
                    <span className="text-main text-sm">
                      {deliveryCharge == 30
                        ? "Free"
                        : `AED ${parseFloat(deliveryCharge).toFixed(2)}`}{" "}
                      ({parseFloat(distance).toFixed(2)} KMs)
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 border-t border-gray-400 pt-2">
                    <span className="font-semibold text-sm">Total</span>
                    <span className="text-sm font-bold">
                      AED{" "}
                      {(Number(totalPrice) + Number(deliveryCharge)).toFixed(2)}
                    </span>
                  </div>
                </div>
                {/* Delivery Address */}
                <DeliveryLocationCard
                  handleChangeAddress={handleChangeAddress}
                />
                <div className="h-20"></div>
              </section>
              <BottumComponent
                isDeliveryAvailable={isDeliveryAvailable}
                isShopOpened={isShopOpened}
                totalPrice={(
                  Number(totalPrice) + Number(deliveryCharge)
                ).toFixed(2)}
              />
            </>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Your cart is empty!
            </p>
          )}
        </>
      )}

      {/* Bottom Component */}
    </div>
  );
}

export default CartPage;
