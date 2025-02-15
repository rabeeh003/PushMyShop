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
  selectUserData,
} from "../../store/appSlice";
import DeliveryLocationCard from "./components/DeliveryLocationCard";
import axios from "axios";

function CartPage() {
  const dispatch = useDispatch();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(true);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false); // Loading state
  const [isShopOpened, setIsShopOpened] = useState(false); // Loading state
  const [addresses, setAddresses] = useState();
  const [addressesModel, setAddressesModel] = useState();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const shopData = useSelector(selectShopData);
  const userData = useSelector(selectUserData);
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
    // Set a 3-second timeout to stop loading
    const timer = setTimeout(() => {
      setBottomLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  useEffect(() => {
    // console.log(currentDeliveryLocation);
    handleChangeAddress();
  });

  useEffect(() => {
    calculateDeliveryCharge();
  });

  useEffect(() => {
    const getAddresses = () => {
      const data = {
        user_id: userData.data.id,
        token: userData.data.auth_token,
        restaurant_id: null,
      };
      axios
        .post("https://lewoffy.infineur.com/public/api/get-addresses", data)
        .then((res) => {
          console.log("Get Address : ", res.data);
          setAddresses(res.data);
        });
    };
    if (userData?.data?.id) {
      getAddresses();
    }
  }, []);

  const handleChangeAddress = () => {
    setLoading(true)

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

    setLoading(false)
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
                              className={`w-2 h-2 rounded-full ${item.is_veg ? "bg-green-500" : "bg-red-500"
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
                {addresses && (
                  <DeliveryLocationCard
                    handleChangeAddress={handleChangeAddress}
                    isModalOpen={addressesModel}
                    setIsModalOpen={() => setAddressesModel(!addressesModel)}
                  />
                )}
                <div className="h-20"></div>
              </section>
              {userData && bottomLoading ? (
                <div className="fixed sm:max-w-[560px] min-h-[73px] z-40 bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg ">
                  <div className="flex justify-between items-center">
                    <div className="w-32 my-1">
                      <div class="skeleton h-6 rounded-md mb-1"></div>
                      <div class="skeleton h-3 rounded-md"></div>
                    </div>
                      <div class="skeleton h-10 w-32 rounded-md"></div>
                  </div>
                </div>
              ) : userData && !addresses ? (
                <div className="fixed sm:max-w-[560px] bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg ">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold ">No locations</p>
                    </div>
                    {/* View Cart Button */}
                    <Link to={"/account/add-address"}
                      className={`btn bg-white text-main-color text-sm font-semibold py-2 px-4 rounded-md shadow`}
                    >
                      Add Location
                    </Link>
                  </div>
                </div>
              ) : userData && !currentDeliveryLocation ? (
                <div className="fixed sm:max-w-[560px] bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg ">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold ">Address not selected</p>
                    </div>
                    {/* View Cart Button */}
                    <button
                      onClick={() => setAddressesModel(true)}
                      className={`btn bg-white text-main-color text-sm font-semibold py-2 px-4 rounded-md shadow`}
                    >
                      Select Address
                    </button>
                  </div>
                </div>
              ) : userData ? (
                <BottumComponent
                  isDeliveryAvailable={isDeliveryAvailable}
                  isShopOpened={isShopOpened}
                  totalPrice={(
                    Number(totalPrice) + Number(deliveryCharge)
                  ).toFixed(2)}
                />
              ) : (
                <div className="fixed sm:max-w-[560px] bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg ">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold ">You not loged</p>
                    </div>
                    {/* View Cart Button */}
                    <Link to={"/auth"}
                      className={`btn bg-white text-main-color text-sm font-semibold py-2 px-4 rounded-md shadow`}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
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
