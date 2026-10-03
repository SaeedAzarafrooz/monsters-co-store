import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./Components/sections/Header";
import Footer from "./Components/sections/Footer";
import Home from "./Components/pages/Home";
import ContactUs from "./Components/pages/ContactUs";
import AboutUs from "./Components/pages/AboutUs";
import Products from "./Components/pages/Products";
import ProfileLayout from "./Components/pages/profile/ProfileLayout";
import Overview from "./Components/pages/profile/Overview";
import UnderConstruction from "./Components/UnderConstruction";
import NotFound from "./Components/pages/NotFound";
import Checkout from "./Components/pages/cart/Checkout";
import OrderHistory from "./Components/pages/orders/OrderHistory";
import OrderTracking from "./Components/pages/orders/OrderTracking";
import Favorites from "./Components/pages/profile/Favorites";
// Helper component for backward compatibility redirect with dynamic param
function NavigateToProfileOrder() {
  const { orderId } = useParams();
  return <Navigate to={`/profile/orders/${orderId}`} replace />;
}
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
          <Route path="/checkout" element={<Checkout />} />

          {/* Direct orders tracking & fallback */}
          <Route
            path="/orders"
            element={<Navigate to="/profile/orders" replace />}
          />
          <Route path="/orders/:orderId" element={<NavigateToProfileOrder />} />
          {/* Account Profile Section */}
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Overview />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:orderId" element={<OrderTracking />} />
            <Route path="favorites" element={<Favorites />} />
            <Route
              path="settings"
              element={
                <UnderConstruction
                  title="Account Settings"
                  description="Personalization and security settings are under development."
                />
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
