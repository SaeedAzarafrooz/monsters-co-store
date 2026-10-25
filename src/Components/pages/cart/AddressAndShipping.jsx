import {
  FormInput,
  FormGrid,
  OptionCard,
  CardBody,
  CardHeader,
  CardTitle,
  H2,
  Separator,
} from "../../ui";
import { validateField } from "./addressValidation";

function AddressAndShipping({
  formData,
  setFormData,
  formErrors = {},
  setFormErrors,
  shippingMethod,
  setShippingMethod,
  onSubmit,
  submitLabel,
}) {
  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));

    // Real-time error clearance on correction
    if (setFormErrors && formErrors[key]) {
      const error = validateField(key, value);
      setFormErrors((prev) => ({
        ...prev,
        [key]: error || undefined,
      }));
    }
  };

  const handleBlur = (key) => () => {
    if (setFormErrors) {
      const error = validateField(key, formData[key]);
      if (error) {
        setFormErrors((prev) => ({ ...prev, [key]: error }));
      }
    }
  };

  return (
    <CardBody scrollable>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>

      <FormGrid columns={2} onSubmit={onSubmit} submitLabel={submitLabel}>
        <FormInput
          id="fullName"
          label="Full name *"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          onBlur={handleBlur("fullName")}
          error={formErrors.fullName}
          placeholder="Rick Sanchez"
        />

        <FormInput
          id="email"
          label="Email address *"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={formErrors.email}
          placeholder="rick@citadel.com"
        />

        <FormInput
          id="phone"
          label="Phone number"
          type="tel"
          value={formData.phone}
          onChange={handleChange("phone")}
          onBlur={handleBlur("phone")}
          error={formErrors.phone}
          placeholder="+1 (555) 019-2834"
        />

        <FormInput
          id="addressLine1"
          label="Street address *"
          value={formData.addressLine1}
          onChange={handleChange("addressLine1")}
          onBlur={handleBlur("addressLine1")}
          error={formErrors.addressLine1}
          placeholder="123 Dimension C-137 St."
        />

        <FormInput
          id="city"
          label="City *"
          value={formData.city}
          onChange={handleChange("city")}
          onBlur={handleBlur("city")}
          error={formErrors.city}
          placeholder="Seattle"
        />

        <FormInput
          id="zipCode"
          label="Postal / ZIP code *"
          value={formData.zipCode}
          onChange={handleChange("zipCode")}
          onBlur={handleBlur("zipCode")}
          error={formErrors.zipCode}
          placeholder="98101"
        />
      </FormGrid>

      <div className="mt-6">
        <H2 className="text-lg font-extrabold mb-4 pb-2 border-b border-border">
          Shipping Method
        </H2>
        <div className="space-y-3">
          <OptionCard
            name="shipping"
            value="standard"
            checked={shippingMethod === "standard"}
            onChange={() => setShippingMethod("standard")}
            title="Standard Delivery"
            description="3–5 business days"
            badge={
              <span className="font-extrabold text-primary text-sm">$4.99</span>
            }
          />

          <OptionCard
            name="shipping"
            value="express"
            checked={shippingMethod === "express"}
            onChange={() => setShippingMethod("express")}
            title="Express Courier"
            description="1–2 business days"
            badge={
              <span className="font-extrabold text-primary text-sm">$9.99</span>
            }
          />
        </div>
      </div>
    </CardBody>
  );
}

export default AddressAndShipping;
