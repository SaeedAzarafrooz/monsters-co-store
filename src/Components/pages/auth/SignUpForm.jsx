import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../FormInput";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateUserDisplayName,
} from "../../../utils/firebase/firebase";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFields);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await updateUserDisplayName(user, displayName);
      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
      navigate("/profile");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Cannot create user, email is already in use.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-app-border bg-app-card p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-black text-app-text">Create Account</h2>
        <p className="mt-1 text-xs text-app-muted">
          Sign up with your credentials to start managing your orders.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-semibold text-rose-500">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Display Name"
          id="signup-name"
          name="displayName"
          type="text"
          required
          value={displayName}
          onChange={handleChange}
          placeholder="e.g. John Doe"
        />

        <FormInput
          label="Email Address"
          id="signup-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleChange}
          placeholder="name@example.com"
        />

        <FormInput
          label="Password"
          id="signup-password"
          name="password"
          type="password"
          required
          value={password}
          onChange={handleChange}
          placeholder="At least 6 characters"
        />

        <FormInput
          label="Confirm Password"
          id="signup-confirm"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Repeat password"
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-app-accent px-4 py-2.5 text-sm font-extrabold text-app-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
