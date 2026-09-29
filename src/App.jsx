import { Routes, Route } from "react-router-dom";
import Header from "./Components/sections/Header";
import Footer from "./Components/sections/Footer";
import Home from "./Components/pages/Home";
import ContactUs from "./Components/pages/ContactUs";
import AboutUs from "./Components/pages/AboutUs";
import Products from "./Components/pages/Products";

function App() {
  return (
    <div className="flex flex-col bg-app-bg min-h-screen">
      <Header />

      <div className="flex justify-center w-full h-full z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
