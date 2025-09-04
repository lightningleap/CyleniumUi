import { ResetPasswordLinkCard } from "./components/ResetPasswordLinkCard";

export default function ForgotPassword() {
  return (
    <div className="fixed inset-0 bg-[#09090B]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url(/Background.svg)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-12 px-4 py-12">
        {/* Logo */}
        <img
          src="/logo/Cylenium.svg"
          alt="Cylenium"
          className="w-[110.26px] h-[67.21px]"
        />

        {/* Forgot Password Form */}
        <ResetPasswordLinkCard />
      </div>
    </div>
  );
}
