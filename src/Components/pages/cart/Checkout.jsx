import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { Stepper } from "../../ui";
import CartReview from "./CartReview";
import AddressAndShipping from "./AddressAndShipping";
import PaymentSection from "./PaymentSection";
import OrderConfirmation from "./OrderConfirmation";
import { saveOrder } from "../../../utils/orders";

import { validateAddressForm } from "./addressValidation";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Badge,
  Separator,
  Container,
  EmptyState,
  Icon,
  H1,
  Caption,
} from "../../ui";

const STEPS = [
  {
    title: "Checkout",
    icon: <Icon name="bag" size="lg" />
  },
  {
    title: "Shipping & Address",
    icon: <Icon name="pin" size="lg" />
  },
  {
    title: "Payment",
    icon: <Icon name="creditCard" size="lg" />
  },
  {
    title: "Order Placed",
    icon: <Icon name="check-circle" size="lg" />
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

  const [formErrors, setFormErrors] = useState({});

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

    // Validate address before proceeding to Payment
    if (currentStep === 1) {
      const { isValid, errors } = validateAddressForm(formData);
      if (!isValid) {
        setFormErrors(errors);
        return; // Stop navigation, show errors under inputs
      }
      setFormErrors({});
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
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
        ...formData,
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
    <Container className="py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <H1 className="text-2xl font-extrabold tracking-tight">Checkout</H1>
        <Button asChild variant="link">
          <Link to="/products">Continue shopping</Link>
        </Button>
      </div>

      <div className="max-w-3xl mx-auto mb-10">
        <Stepper currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Main Locked Split Layout */}
      <div className="w-full flex flex-col lg:flex-row justify-center gap-8 items-start">
        <Card fixedLayout="mainPane" padding="lg">
          <CardBody>
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
                formErrors={formErrors}
                setFormErrors={setFormErrors}
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

            {currentStep === 3 && (
              <OrderConfirmation orderId={currentOrderId} />
            )}
          </CardBody>
        </Card>

        <Card fixedLayout="sidebar">
          {currentStep < 3 ? (
            <>
              <div>
                <CardHeader>
                  <CardTitle>Order summary</CardTitle>
                </CardHeader>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="text-foreground font-semibold">
                      ${Number(totalPrice || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="text-foreground font-semibold">
                      {shippingCost === null ? (
                        <Badge variant="secondary">Calculated next</Badge>
                      ) : (
                        `${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-baseline font-extrabold text-xl">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      ${payableTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-3 mt-8">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}

                  {currentStep < 2 ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={handleNext}
                      disabled={
                        (currentStep === 0 && cartItems.length === 0) ||
                        (currentStep === 1 && !isAddressValid)
                      }
                      className="flex-1"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      onClick={handlePlaceOrder}
                      disabled={cartItems.length === 0}
                      className="flex-1"
                    >
                      Place order
                    </Button>
                  )}
                </div>

                <div className="h-6 mt-2">
                  {currentStep === 1 && !isAddressValid && (
                    <Caption className="text-xs text-center text-muted-foreground block">
                      Please fill in all required address fields.
                    </Caption>
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              title="Receipt Issued"
              description="A copy of your invoice has been sent to your email address."
            />
          )}
        </Card>
      </div>
    </Container>
  );
}

export default Checkout;
