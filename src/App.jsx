// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import LocationPage from "./pages/location/LocationPage";

function App() {
  return (
    <div className="sm:max-w-[560px] mx-auto">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/location" element={<LocationPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
