import SignInForm from "../../pages/auth/SignInForm";
import SignUpForm from "../../pages/auth/SignUpForm";

export default function Authentication() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
