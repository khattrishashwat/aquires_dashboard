import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if OTP was verified
    const isOtpVerified = localStorage.getItem("otpVerified");
    if (!isOtpVerified) {
      toast.error("Please verify OTP first");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("one number");
    }
    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      toast.error(`Password must contain: ${passwordErrors.join(", ")}`);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const identifier = localStorage.getItem("resetIdentifier");
      
      toast.success("Password reset successful! Please login with your new password.");
      
      // Clear stored data
      localStorage.removeItem("otpVerified");
      localStorage.removeItem("resetIdentifier");
      localStorage.removeItem("resetIdentifierType");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-md">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a1339] mb-3">
          Create New Password
        </h1>
        <p className="text-[#635c8a] text-base">
          Your new password must be different from your previous password.
        </p>
      </div>
      
      <form onSubmit={handleResetPassword} className="space-y-5">
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold text-[#1a1339] mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all pr-12"
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#635c8a] hover:text-[#4b1b91] transition-colors"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.16 13.16 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx={12} cy={12} r={3} />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-[#1a1339] mb-2"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="w-full px-4 py-3.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all"
            disabled={loading}
          />
        </div>

        <div className="bg-[#f8f7fa] rounded-xl p-4">
          <p className="text-xs text-[#635c8a] mb-2">Password requirements:</p>
          <ul className="text-xs text-[#635c8a] space-y-1 list-disc list-inside">
            <li className={newPassword.length >= 6 ? "text-green-600" : ""}>
              At least 6 characters
            </li>
            <li className={/[A-Z]/.test(newPassword) ? "text-green-600" : ""}>
              At least one uppercase letter
            </li>
            <li className={/[0-9]/.test(newPassword) ? "text-green-600" : ""}>
              At least one number
            </li>
          </ul>
        </div>
        
        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          className="w-full py-3.5 bg-gradient-to-r from-[#4b1b91] to-[#c07bfc] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;