import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase";
import FormInput from "../../ui/FormInput";
import { Icon } from "../../ui";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formFields;

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
    setIsSubmitting(true);

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetForm();
      navigate("/profile");
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage(
          "Access temporarily disabled due to many failed attempts. Try again later.",
        );
      } else {
        setErrorMessage("Failed to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    try {
      await signInWithGooglePopup();
      navigate("/profile");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        setErrorMessage("Google sign in failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-app-border bg-app-card p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-black text-app-text">Welcome Back</h2>
        <p className="mt-1 text-xs text-app-muted">
          Sign in with your email and password to access your account.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-semibold text-rose-500">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email Address"
          id="signin-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleChange}
          placeholder="name@example.com"
        />

        <FormInput
          label="Password"
          id="signin-password"
          name="password"
          type="password"
          required
          value={password}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-app-accent px-4 py-2.5 text-sm font-extrabold text-app-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-app-border bg-app-bg px-4 py-2.5 text-sm font-bold text-app-text transition-colors hover:bg-app-hover"
          >
            <Icon name="google" size="sm" />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}
