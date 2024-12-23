// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import LocationPage from "./pages/location/LocationPage";
import OTPPage from "./pages/auth/OtpPage";
import OrderesPage from "./pages/myorder/OrderesPage";

function App() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
        console.log('SW registration failed:', registrationError);
      });
    });
  }

  return (
    <div className="sm:max-w-[560px] mx-auto">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<OTPPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/orders" element={<OrderesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
