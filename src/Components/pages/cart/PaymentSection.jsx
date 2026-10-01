
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



export default PaymentSection;