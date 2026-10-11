import { useState } from "react";
import { FormGrid, FormInput, Button } from "../../ui";
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

export default function SignUpForm({ onSuccess, onSwitchToSignIn }) {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (onSuccess) onSuccess();
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
    <div className="w-full min-h-[555px] flex flex-col justify-between space-y-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Create Account
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Sign up with your credentials to start managing your orders.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive animate-fadeIn">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid columns={1}>
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
          </FormGrid>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full h-11 text-sm font-bold shadow-md cursor-pointer"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>

      {onSwitchToSignIn && (
        <div className="text-center pt-2 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="font-bold text-primary hover:underline cursor-pointer transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
