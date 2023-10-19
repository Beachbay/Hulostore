import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/routes/Products";
import Navbar from "./components/Navbar";

import './App.css'

function App() {
 

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Products />}/>
      </Routes>
    </div>
  )
}

export default App
