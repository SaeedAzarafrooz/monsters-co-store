import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import Stepper from "./Stepper";
import CartReview from "./CartReview";
import AddressAndShipping from "./AddressAndShipping";
import PaymentSection from "./PaymentSection";

import { saveOrder } from "../../../utils/orders";
import OrderConfirmation from "./OrderConfirmation";

const STEPS = [
  {
    title: "Checkout",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: "Shipping & Address",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Payment",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: "Order Placed",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function Checkout() {
  const {
    cartItems,
    totalPrice,
    addToCart,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [currentStep, setCurrentStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [currentOrderId, setCurrentOrderId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    city: "",
    zipCode: "",
  });

  const shippingCost = useMemo(() => {
    if (currentStep === 0) return null;
    return shippingMethod === "express" ? 9.99 : 4.99;
  }, [currentStep, shippingMethod]);

  const payableTotal = useMemo(() => {
    const base = Number(totalPrice) || 0;
    return base + (shippingCost || 0);
  }, [totalPrice, shippingCost]);

  const isAddressValid = useMemo(() => {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.addressLine1.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.zipCode.trim() !== ""
    );
  }, [formData]);

  const handleNext = () => {
    if (currentStep === 0 && cartItems.length === 0) return;
    if (currentStep === 1 && !isAddressValid) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

const handlePlaceOrder = () => {
  if (cartItems.length === 0) return;

  const orderId = `ORD-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;

  const orderShippingCost = shippingMethod === "express" ? 9.99 : 4.99;
  const orderSubtotal = Number(totalPrice) || 0;

  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "Processing",
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 0,
    })),
    shipping: {
      method: shippingMethod,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      addressLine1: formData.addressLine1,
      city: formData.city,
      zipCode: formData.zipCode,
    },
    paymentMethod,
    subtotal: orderSubtotal,
    shippingCost: orderShippingCost,
    total: orderSubtotal + orderShippingCost,
  };

  saveOrder(order);
  setCurrentOrderId(orderId);
  setCurrentStep(3);
  clearCart();
};

  return (
    <div className="min-h-screen bg-app-bg text-app-text py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-app-border">
          <h1 className="text-2xl font-extrabold tracking-tight">Checkout</h1>
          <Link
            to="/products"
            className="text-sm font-semibold text-app-muted hover:text-app-text transition-colors"
          >
            Continue shopping
          </Link>
        </div>

        {/* Stepper Progress */}
        <div className="max-w-3xl mx-auto mb-10">
          <Stepper currentStep={currentStep} steps={STEPS} />
        </div>

        {/* Locked structural grid: 1fr and 360px sidebar */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          
          {/* Main Content Box: strictly locked height */}
          <div className="w-full h-[600px] min-h-[600px] max-h-[600px] bg-app-card p-6 sm:p-8 rounded-2xl border border-app-border overflow-hidden flex flex-col">
            <div className="w-full h-full flex flex-col min-h-0">
              {currentStep === 0 && (
                <CartReview
                  cartItems={cartItems}
                  addToCart={addToCart}
                  decreaseQuantity={decreaseQuantity}
                  removeItem={removeItem}
                />
              )}

              {currentStep === 1 && (
                <AddressAndShipping
                  formData={formData}
                  setFormData={setFormData}
                  shippingMethod={shippingMethod}
                  setShippingMethod={setShippingMethod}
                />
              )}

              {currentStep === 2 && (
                <PaymentSection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  formData={formData}
                  shippingMethod={shippingMethod}
                />
              )}

              {currentStep === 3 && <OrderConfirmation orderId={currentOrderId} />}
            </div>
          </div>

          {/* Right Sidebar Box: strictly locked height */}
          <div className="w-full h-[600px] min-h-[600px] max-h-[600px] bg-app-card p-6 rounded-2xl border border-app-border flex flex-col justify-between">
            {currentStep < 3 ? (
              <>
                <div>
                  <h3 className="text-lg font-bold mb-5 pb-3 border-b border-app-border">
                    Order summary
                  </h3>

                  <div className="space-y-4 text-sm text-app-muted">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-app-text font-semibold">
                        ${Number(totalPrice || 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Shipping</span>
                      <span className="text-app-text font-semibold">
                        {shippingCost === null ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-app-hover text-app-accent font-bold">
                            ?
                          </span>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <hr className="border-app-border my-2" />

                    <div className="flex justify-between items-baseline font-extrabold text-xl">
                      <span className="text-app-text">Total</span>
                      <span className="text-app-accent">
                        ${payableTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-3 mt-8">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3 rounded-xl bg-app-hover text-app-text font-bold border border-app-border hover:opacity-90 transition-opacity"
                      >
                        Back
                      </button>
                    )}

                    {currentStep < 2 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          (currentStep === 0 && cartItems.length === 0) ||
                          (currentStep === 1 && !isAddressValid)
                        }
                        className="flex-1 py-3 rounded-xl bg-app-accent text-app-bg font-extrabold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={cartItems.length === 0}
                        className="flex-1 py-3 rounded-xl bg-app-accent text-app-bg font-extrabold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Place order
                      </button>
                    )}
                  </div>

                  <div className="h-6 mt-2">
                    {currentStep === 1 && !isAddressValid && (
                      <p className="text-xs text-center text-app-muted">
                        Please fill in all required address fields.
                      </p>
                    )}
                    {cartItems.length === 0 && (
                      <p className="text-xs text-center text-app-muted">
                        Your cart is empty. Please add items to proceed.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-app-accent/10 border border-app-accent flex items-center justify-center text-app-accent mb-4">
                  <svg className="w-6 h-6 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-app-text mb-1">Receipt Issued</h4>
                <p className="text-xs text-app-muted">
                  A copy of your invoice has been sent to your email address.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;