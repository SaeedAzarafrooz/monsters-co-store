import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Modal, ModalContent, ModalBody } from "../../ui";

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="relative z-10 w-full max-w-md overflow-hidden shadow-2xl border-border bg-card/95 backdrop-blur-md">
        <ModalBody className="p-6">
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
        </ModalBody>
      </ModalContent>
    </Modal>,
    modalRoot
  );
}
