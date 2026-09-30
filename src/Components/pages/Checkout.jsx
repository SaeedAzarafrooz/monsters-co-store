import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

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

export default function Checkout() {
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

              {currentStep === 3 && <OrderConfirmation />}
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

function Stepper({ currentStep, steps }) {
  const totalSteps = steps.length;
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="relative px-6 select-none">
      {/* Background track line */}
      <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-app-hover rounded-full" />

      {/* Progress fill line: uses pure percentage without invalid inline calc syntax */}
      <div
        className="absolute top-1/2 left-6 -translate-y-1/2 h-1.5 bg-app-accent rounded-full transition-all duration-300 ease-out"
        style={{
          width: progressPercent === 0 ? "0px" : `calc(${progressPercent}% - ${(progressPercent * 48) / 100}px)`,
        }}
      />

      <div className="relative flex justify-between items-center z-10">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isDone = index < currentStep;

          return (
            <div key={step.title} className="relative group flex flex-col items-center">
              <div
                className={[
                  "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200",
                  "bg-app-card shadow-sm cursor-default",
                  isActive
                    ? "border-app-accent text-app-accent shadow-app-accent/20"
                    : "border-app-border text-app-muted",
                ].join(" ")}
              >
                {isDone ? (
                  <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>

              <div className="absolute -bottom-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-app-hover text-app-text text-xs font-semibold py-1 px-2.5 rounded-md border border-app-border whitespace-nowrap shadow-lg z-20">
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CartReview({ cartItems, addToCart, decreaseQuantity, removeItem }) {
  if (!cartItems.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-app-muted text-base">Your shopping cart is currently empty.</p>
        <Link
          to="/products"
          className="inline-block mt-4 text-sm font-bold text-app-accent hover:underline"
        >
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[700px] h-full flex flex-col min-h-0">
      <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-app-border text-xs font-bold uppercase tracking-wider text-app-muted shrink-0">
        <span className="col-span-6">Product</span>
        <span className="col-span-3 text-center">Quantity</span>
        <span className="col-span-2 text-right">Price</span>
        <span className="col-span-1 text-center">Remove</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pt-3 space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center bg-app-hover p-4 rounded-xl border border-app-border"
          >
            <div className="col-span-6 flex items-center gap-4 w-full min-w-0">
              <img
                src={item.image}
                className="w-16 h-16 rounded-lg object-cover border border-app-border shrink-0"
                alt={item.name}
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-app-text truncate">{item.name}</p>
                <p className="text-xs text-app-muted mt-1">
                  ${Number(item.price || 0).toFixed(2)} each
                </p>
              </div>
            </div>

            <div className="col-span-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
                className={`w-8 h-8 rounded-lg bg-app-card border border-app-border flex items-center justify-center font-bold transition-colors ${
                  item.quantity <= 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-app-hover"
                }`}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center font-extrabold text-sm">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => addToCart(item)}
                className="w-8 h-8 rounded-lg bg-app-card border border-app-border flex items-center justify-center font-bold hover:bg-app-hover transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="col-span-2 text-right font-extrabold text-app-accent text-base">
              ${(Number(item.price || 0) * (Number(item.quantity) || 0)).toFixed(2)}
            </div>

            <div className="col-span-1 flex justify-center">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-2 text-app-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressAndShipping({ formData, setFormData, shippingMethod, setShippingMethod }) {
  const onChange = (key) => (e) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="w-[700px] h-full overflow-y-auto pr-2 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold mb-4 pb-2 border-b border-app-border">
          Shipping Address
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">
                Full name <span className="text-app-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={onChange("fullName")}
                placeholder="Rick Sanchez"
                className="w-full bg-app-hover text-app-text p-3 rounded-xl border border-app-border outline-none focus:ring-2 focus:ring-app-accent/30 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">
                Email address <span className="text-app-accent">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={onChange("email")}
                placeholder="rick@citadel.com"
                className="w-full bg-app-hover text-app-text p-3 rounded-xl border border-app-border outline-none focus:ring-2 focus:ring-app-accent/30 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">Phone number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={onChange("phone")}
                placeholder="+1 (555) 019-2834"
                className="w-full bg-app-hover text-app-text p-3 rounded-xl border border-app-border outline-none focus:ring-2 focus:ring-app-accent/30 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">
                Street address <span className="text-app-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={onChange("addressLine1")}
                placeholder="123 Dimension C-137 St."
                className="w-full bg-app-hover text-app-text p-3 rounded-xl border border-app-border outline-none focus:ring-2 focus:ring-app-accent/30 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">
                City <span className="text-app-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={onChange("city")}
                placeholder="Seattle"
                className="w-full bg-app-hover text-app-text p-3 rounded-xl border border-app-border outline-none focus:ring-2 focus:ring-app-accent/30 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">
                Postal / ZIP code <span className="text-app-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={onChange("zipCode")}
                placeholder="98101"
                className="w-full bg-app-hover text-app-text p-3 rounded-xl border border-app-border outline-none focus:ring-2 focus:ring-app-accent/30 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-extrabold mb-4 pb-2 border-b border-app-border">
          Shipping Method
        </h2>
        <div className="space-y-3">
          <label
            onClick={() => setShippingMethod("standard")}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              shippingMethod === "standard"
                ? "border-app-accent bg-app-accent/5"
                : "border-app-border bg-app-hover"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
                className="accent-app-accent"
              />
              <div>
                <p className="font-bold text-sm">Standard Delivery</p>
                <p className="text-xs text-app-muted">3–5 business days</p>
              </div>
            </div>
            <span className="font-extrabold text-app-accent text-sm">$4.99</span>
          </label>

          <label
            onClick={() => setShippingMethod("express")}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              shippingMethod === "express"
                ? "border-app-accent bg-app-accent/5"
                : "border-app-border bg-app-hover"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
                className="accent-app-accent"
              />
              <div>
                <p className="font-bold text-sm">Express Courier</p>
                <p className="text-xs text-app-muted">1–2 business days</p>
              </div>
            </div>
            <span className="font-extrabold text-app-accent text-sm">$9.99</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function PaymentSection({ paymentMethod, setPaymentMethod, formData, shippingMethod }) {
  return (
    <div className="w-[700px] h-full overflow-y-auto pr-2 space-y-6">
      <h2 className="text-lg font-extrabold pb-2 border-b border-app-border">
        Payment Method
      </h2>

      <div className="bg-app-hover border border-app-border rounded-xl p-4 text-sm space-y-1">
        <p className="font-bold text-app-text">Deliver to:</p>
        <p className="text-app-muted">{formData.fullName || "Guest Customer"}</p>
        <p className="text-app-muted">
          {formData.addressLine1
            ? `${formData.addressLine1}, ${formData.city} ${formData.zipCode}`
            : "No address specified"}
        </p>
        <p className="text-xs text-app-accent font-semibold capitalize pt-1">
          {shippingMethod} shipping selected
        </p>
      </div>

      <div className="space-y-3">
        <label
          onClick={() => setPaymentMethod("card")}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === "card"
              ? "border-app-accent bg-app-accent/5"
              : "border-app-border bg-app-hover"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="accent-app-accent"
            />
            <div>
              <p className="font-bold text-sm">Credit / Debit Card</p>
              <p className="text-xs text-app-muted">Instant and secure</p>
            </div>
          </div>
          <span className="text-xs font-bold text-app-muted">VISA / Mastercard</span>
        </label>

        <label
          onClick={() => setPaymentMethod("cod")}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === "cod"
              ? "border-app-accent bg-app-accent/5"
              : "border-app-border bg-app-hover"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="accent-app-accent"
            />
            <div>
              <p className="font-bold text-sm">Cash on Delivery</p>
              <p className="text-xs text-app-muted">Pay when order arrives</p>
            </div>
          </div>
          <span className="text-xs font-bold text-app-muted">Cash / POS</span>
        </label>
      </div>
    </div>
  );
}

function OrderConfirmation() {
  return (
    <div className="w-[700px] h-full flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-app-accent/10 border border-app-accent flex items-center justify-center text-app-accent">
        <svg className="w-8 h-8 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold text-app-text">Order Confirmed!</h2>
      <p className="text-sm text-app-muted max-w-md mx-auto">
        Thank you for your order. We have received your purchase and are preparing it for delivery.
      </p>

      <div className="pt-6">
        <Link
          to="/products"
          className="inline-block px-6 py-3 rounded-xl bg-app-accent text-app-bg font-extrabold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
