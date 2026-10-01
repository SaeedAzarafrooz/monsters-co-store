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



export default AddressAndShipping;