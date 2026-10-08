// Validation rules and regex patterns for address inputs
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const ZIP_REGEX = /^[0-9A-Za-z\s-]{3,10}$/;

/**
 * Validate a single field by key and value
 * @param {string} name 
 * @param {string} value 
 * @returns {string|null} error message or null if valid
 */
export function validateField(name, value = "") {
  const trimmed = String(value).trim();

  switch (name) {
    case "fullName":
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      return null;

    case "email":
      if (!trimmed) return "Email address is required.";
      if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
      return null;

    case "phone":
      // Phone is optional, but if entered it must match the pattern/length
      if (trimmed && !PHONE_REGEX.test(trimmed)) {
        return "Please enter a valid phone number (min 7 digits).";
      }
      return null;

    case "addressLine1":
      if (!trimmed) return "Street address is required.";
      if (trimmed.length < 5) return "Please enter a valid street address.";
      return null;

    case "city":
      if (!trimmed) return "City is required.";
      return null;

    case "zipCode":
      if (!trimmed) return "Postal / ZIP code is required.";
      if (!ZIP_REGEX.test(trimmed)) return "Please enter a valid ZIP / postal code.";
      return null;

    default:
      return null;
  }
}

/**
 * Validate full address form data object
 * @param {Object} data 
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateAddressForm(data) {
  const fields = ["fullName", "email", "phone", "addressLine1", "city", "zipCode"];
  const errors = {};

  fields.forEach((field) => {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
