import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCaptchaBox from "./ReCaptchaBox";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState("email");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const validateIdentifier = () => {
    if (!identifier.trim()) {
      toast.error(`Please enter your ${identifierType === "email" ? "email" : "phone number"}`);
      return false;
    }

    if (identifierType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(identifier.replace(/\D/g, ''))) {
        toast.error("Please enter a valid 10-digit phone number");
        return false;
      }
    }

    return true;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!validateIdentifier()) return;

    if (!captchaToken) {
      toast.error("Please verify that you're not a robot");
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store identifier info for OTP page
      localStorage.setItem("resetIdentifier", identifier);
      localStorage.setItem("resetIdentifierType", identifierType);
      
      const maskedIdentifier = identifierType === "email" 
        ? identifier.replace(/(.{2})(.*)(@)/, (_, first, middle, at) => first + '*'.repeat(middle.length) + at)
        : identifier.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
      
      toast.success(`OTP sent to ${maskedIdentifier}`);
      
      // Navigate to OTP verify page
      navigate("/otp-verify", {
        state: {
          identifier: identifier,
          identifierType: identifierType
        }
      });
      
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-md">
      <div className="mb-8">
        <button
          onClick={handleBackToLogin}
          className="mb-4 text-[#635c8a] hover:text-[#4b1b91] transition-colors flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Login
        </button>
        
        <h1 className="text-4xl font-bold text-[#1a1339] mb-3">
          Forgot Password?
        </h1>
        <p className="text-[#635c8a] text-base">
          Enter your email or phone number to receive a verification code.
        </p>
      </div>
      
      <form onSubmit={handleSendOTP} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1a1339] mb-2">
            Reset via
          </label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={identifierType === "email"}
                onChange={() => {
                  setIdentifierType("email");
                  setIdentifier("");
                }}
                className="w-4 h-4 text-[#4b1b91] focus:ring-2 focus:ring-[#c07bfc]"
              />
              <span className="text-sm text-[#1a1339]">Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={identifierType === "phone"}
                onChange={() => {
                  setIdentifierType("phone");
                  setIdentifier("");
                }}
                className="w-4 h-4 text-[#4b1b91] focus:ring-2 focus:ring-[#c07bfc]"
              />
              <span className="text-sm text-[#1a1339]">Phone Number</span>
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-semibold text-[#1a1339] mb-2"
          >
            {identifierType === "email" ? "Email Address" : "Phone Number"}
          </label>
          <input
            id="identifier"
            type={identifierType === "email" ? "email" : "tel"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={identifierType === "email" 
              ? "Enter your email address" 
              : "Enter your 10-digit phone number"}
            className="w-full px-4 py-3.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all"
            disabled={loading}
          />
        </div>

        <ReCaptchaBox setCaptcha={setCaptchaToken} />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-[#4b1b91] to-[#c07bfc] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Sending OTP..." : "Send Verification Code"}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-[#635c8a]">
          Remember your password?{" "}
          <button
            onClick={handleBackToLogin}
            className="text-[#4b1b91] hover:text-[#c07bfc] font-medium transition-colors"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;