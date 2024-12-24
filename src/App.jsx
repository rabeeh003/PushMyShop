// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import CheckOutPage from "./pages/checkOut/CheckOutPage";
import OTPPage from "./pages/auth/OtpPage";
import OrderesPage from "./pages/myorder/OrderesPage";
import AboutPage from "./pages/about/AboutPage";
import Address from "./pages/address/Address";
import AddLocationPage from "./pages/address/AddLocation";
import { LoadScript } from "@react-google-maps/api";

const libraries = ['places']; // google map

function App() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
        console.log('SW registration failed:', registrationError);
      });
    });
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyCBmFnNqWbizwxbnfF-6F4hUNp8jh5_RlY" libraries={libraries}>

    <div className="sm:max-w-[560px] mx-auto bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<OTPPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/account">
            <Route index element={<AboutPage />} />
            <Route path="orders" element={<OrderesPage />} />
            <Route path="address" element={<Address />} />
            <Route path="add-address" element={<AddLocationPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
    </LoadScript>
  );
}

export default App;
