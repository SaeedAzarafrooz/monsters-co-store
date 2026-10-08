import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Badge,
  OptionCard,
} from "../../ui";

function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  formData,
  shippingMethod,
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>

      <CardBody scrollable>
        {/* Delivery Summary */}
        <Card padding="none" className="p-4 text-sm space-y-1">
          <p className="font-bold text-foreground">Deliver to:</p>
          <p className="text-muted-foreground">
            {formData.fullName || "Guest Customer"}
          </p>
          <p className="text-muted-foreground">
            {formData.addressLine1
              ? `${formData.addressLine1}, ${formData.city} ${formData.zipCode}`
              : "No address specified"}
          </p>
          <p className="text-xs text-primary font-semibold capitalize pt-1">
            {shippingMethod} shipping selected
          </p>
        </Card>

        {/* Payment Options */}
        <div className="space-y-3">
          <OptionCard
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            title="Credit / Debit Card"
            description="Instant and secure"
            badge={
              <Badge variant="secondary" className="font-bold">
                VISA / Mastercard
              </Badge>
            }
          />

          <OptionCard
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
            title="Cash on Delivery"
            description="Pay when order arrives"
            badge={
              <Badge variant="secondary" className="font-bold">
                Cash / POS
              </Badge>
            }
          />
        </div>
      </CardBody>
    </>
  );
}

export default PaymentSection;
