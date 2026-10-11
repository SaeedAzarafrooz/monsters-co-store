import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Card, Button, Icon } from "../../ui";

export default function AuthModal({ isOpen, onClose, initialView = "signin" }) {
  const [view, setView] = useState(initialView); // 'signin' | 'signup'
  const [signInKey, setSignInKey] = useState(0);
  const [signUpKey, setSignUpKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      // Reset forms when modal opens
      setSignInKey((prev) => prev + 1);
      setSignUpKey((prev) => prev + 1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialView]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSwitchToSignUp = () => {
    setSignUpKey((prev) => prev + 1);
    setView("signup");
  };

  const handleSwitchToSignIn = () => {
    setSignInKey((prev) => prev + 1);
    setView("signin");
  };

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal") || document.body;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Dialog Card */}
      <Card
        padding="lg"
        className="relative z-10 w-full max-w-md overflow-hidden shadow-2xl border-border bg-card/95 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer z-20"
        >
          <Icon name="close" className="w-4 h-4" />
        </Button>

        {/* Sliding Forms Container */}
        <div className="relative overflow-hidden w-full min-h-[555px]">
          {/* Sign In View */}
          <div
            className={`w-full transition-all duration-300 ease-in-out ${
              view === "signin"
                ? "translate-x-0 opacity-100 relative pointer-events-auto"
                : "translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            <SignInForm
              key={signInKey}
              onSuccess={onClose}
              onSwitchToSignUp={handleSwitchToSignUp}
            />
          </div>

          {/* Sign Up View */}
          <div
            className={`w-full transition-all duration-300 ease-in-out ${
              view === "signup"
                ? "translate-x-0 opacity-100 relative pointer-events-auto"
                : "-translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            <SignUpForm
              key={signUpKey}
              onSuccess={onClose}
              onSwitchToSignIn={handleSwitchToSignIn}
            />
          </div>
        </div>
      </Card>
    </div>,
    modalRoot
  );
}
