import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OTPVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get identifier (email/phone) from location state or localStorage
  const identifier = location.state?.identifier || localStorage.getItem("resetIdentifier") || "";
  const identifierType = location.state?.identifierType || localStorage.getItem("resetIdentifierType") || "email";

  useEffect(() => {
    // Store identifier info for persistence
    if (identifier) {
      localStorage.setItem("resetIdentifier", identifier);
      localStorage.setItem("resetIdentifierType", identifierType);
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [identifier, identifierType]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.replace(/\D/g, "").slice(0, 6);
    
    if (pastedOtp) {
      const otpArray = pastedOtp.split("");
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = otpArray[i] || "";
      }
      setOtp(newOtp);
      
      // Focus last filled input
      const lastIndex = Math.min(pastedOtp.length - 1, 5);
      const lastInput = document.getElementById(`otp-input-${lastIndex}`);
      if (lastInput) lastInput.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, verify OTP with backend
      // For demo, accept any 6-digit code except "000000"
      if (otpValue === "000000") {
        toast.error("Invalid OTP. Please try again.");
        return;
      }
      
      toast.success("OTP verified successfully!");
      
      // Store verification token
      localStorage.setItem("otpVerified", "true");
      localStorage.setItem("resetIdentifier", identifier);
      
      // Navigate to reset password page
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
      
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      setLoading(true);
      
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`New OTP sent to your ${identifierType === "email" ? "email" : "phone number"}`);
      
      // Reset timer
      setTimeLeft(120);
      setCanResend(false);
      
      // Start timer again
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);
      
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    localStorage.removeItem("resetIdentifier");
    localStorage.removeItem("resetIdentifierType");
    navigate("/forget-password");
  };

  const handleEditIdentifier = () => {
    navigate("/forget-password");
  };

  const getMaskedIdentifier = () => {
    if (!identifier) return "";
    
    if (identifierType === "email") {
      const [localPart, domain] = identifier.split("@");
      if (localPart.length <= 2) return identifier;
      const maskedLocal = localPart[0] + "*".repeat(localPart.length - 2) + localPart.slice(-1);
      return `${maskedLocal}@${domain}`;
    } else {
      // Phone number masking
      const phoneStr = identifier.toString();
      if (phoneStr.length <= 4) return phoneStr;
      return phoneStr.slice(0, 2) + "****" + phoneStr.slice(-2);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-md">
      <div className="mb-8">
        <button
          onClick={handleBackToForgotPassword}
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
          Back
        </button>
        
        <h1 className="text-4xl font-bold text-[#1a1339] mb-3">
          Verify OTP
        </h1>
        <p className="text-[#635c8a] text-base">
          We've sent a verification code to{" "}
          <button
            onClick={handleEditIdentifier}
            className="text-[#4b1b91] font-medium hover:text-[#c07bfc] transition-colors underline decoration-dotted"
          >
            {getMaskedIdentifier() || `your ${identifierType === "email" ? "email" : "phone number"}`}
          </button>
        </p>
      </div>
      
      <form onSubmit={handleVerifyOTP} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1a1339] mb-4 text-center">
            Enter 6-Digit Verification Code
          </label>
          
          <div className="flex justify-between gap-2 mb-4" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-[#1a1339] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all"
                disabled={loading}
              />
            ))}
          </div>
          
          <div className="text-center mt-4">
            {timeLeft > 0 ? (
              <p className="text-sm text-[#635c8a]">
                Code expires in{" "}
                <span className="font-semibold text-[#4b1b91]">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <p className="text-sm text-red-500">Code expired. Please request a new one.</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length !== 6}
          className="w-full py-3.5 bg-gradient-to-r from-[#4b1b91] to-[#c07bfc] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-[#635c8a]">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend || loading}
              className={`font-medium transition-colors ${
                canResend && !loading
                  ? "text-[#4b1b91] hover:text-[#c07bfc] cursor-pointer"
                  : "text-[#635c8a] cursor-not-allowed"
              }`}
            >
              Resend Code
            </button>
          </p>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-[#e6e2e9]">
        <div className="flex items-center justify-center gap-2 text-sm text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>Check your spam folder if you don't see the email</span>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;