import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase";
import { FormGrid, FormInput, Button, Icon, H2, Paragraph } from "../../ui";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm({ onSuccess, onSwitchToSignUp }) {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (onSuccess) onSuccess();
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage(
          "Access temporarily disabled due to many failed attempts. Try again later."
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
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        setErrorMessage("Google sign in failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full min-h-[555px] flex flex-col justify-between space-y-6">
      <div className="space-y-6">
        <div>
          <H2 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back
          </H2>
          <Paragraph className="mt-1 text-xs text-muted-foreground">
            Sign in with your email and password to access your account.
          </Paragraph>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive animate-fadeIn">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid columns={1}>
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
          </FormGrid>

          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full h-11 text-sm font-bold shadow-md cursor-pointer"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
            >
              <Icon name="google" className="w-4 h-4" />
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>

      {onSwitchToSignUp && (
        <div className="text-center pt-2 border-t border-border/60">
          <Paragraph className="text-xs text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="font-bold text-primary hover:underline cursor-pointer transition-colors"
            >
              Create Account
            </button>
          </Paragraph>
        </div>
      )}
    </div>
  );
}
