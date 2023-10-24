import { Routes, Route } from "react-router-dom";
import Products from "./components/routes/Products";
import Navbar from "./components/Navbar";
import Cart from "./components/routes/Cart";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
