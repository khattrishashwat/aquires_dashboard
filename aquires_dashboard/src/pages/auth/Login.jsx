import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCaptchaBox from "./ReCaptchaBox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    } else {
      setEmail("admin@bankacquire.com");
      setPassword("BankAdmin@2026");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!captchaToken) {
      toast.error("Please verify that you're not a robot");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      localStorage.setItem("authtoken", "demo-token-" + Date.now());

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success("Login successful! Redirecting to dashboard...");
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSkip = () => {
    localStorage.setItem("authtoken", "demo-token-" + Date.now());
    toast.info("Demo mode: Skipping to dashboard");
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    toast.info("Password reset link will be sent to your email");
    navigate("/forget-password");
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-md">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a1339] mb-3">
          Welcome Back
        </h1>
        <p className="text-[#635c8a] text-base">
          Enter your email and password to access your account.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#1a1339] mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@bankacquire.com"
            className="w-full px-4 py-3.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all"
            disabled={loading}
          />
        </div>
        
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-[#1a1339] mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
                  className="lucide lucide-eye-off w-5 h-5"
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
                  className="lucide lucide-eye w-5 h-5"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx={12} cy={12} r={3} />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#e6e2e9] text-[#4b1b91] focus:ring-2 focus:ring-[#c07bfc] cursor-pointer"
              disabled={loading}
            />
            <span className="text-sm text-[#635c8a] select-none">
              Remember Me
            </span>
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-[#4b1b91] hover:text-[#c07bfc] transition-colors"
          >
            Forget Your Password?
          </button>
        </div>

        {/* ReCaptchaBox Component */}
        <ReCaptchaBox setCaptcha={setCaptchaToken} />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-[#4b1b91] to-[#c07bfc] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e6e2e9]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#635c8a]">OR</span>
          </div>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleDemoSkip}
          className="text-sm text-[#635c8a] hover:text-[#4b1b91] font-medium transition-colors"
        >
          Demo: Skip to Dashboard →
        </button>
      </div>
    </div>
  );
};

export default Login;