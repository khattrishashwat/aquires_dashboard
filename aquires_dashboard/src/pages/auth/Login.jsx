import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import httpClient from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    } else {
      // Set demo credentials only if no remembered email
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation (minimum 8 characters)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);

      const loginData = {
        email,
        password,
      };

      const response = await httpClient.post(
        "common/auth/admin-login",
        loginData,
      );
      console.log("login response:", response.data.data);

      // Store authentication data
      if (response.data?.data?.token) {
        localStorage.setItem("authtoken", response.data.data.token);
      }

      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success("Login successful! Redirecting to dashboard...");
      
      // Small delay to show success message
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSkip = () => {
    // For demo purposes only - remove in production
    localStorage.setItem("authtoken", "demo-token");
    toast.info("Demo mode: Skipping to dashboard");
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page or show modal
    toast.info("Password reset link will be sent to your email");
    // navigate("/forgot-password");
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
                <form className="space-y-5">
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
                      placeholder="admin@bankacquire.com"
                      className="w-full px-4 py-3.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all"
                      defaultValue="admin@bankacquire.com"
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
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-xl text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all pr-12"
                        defaultValue="BankAdmin@2026"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#635c8a] hover:text-[#4b1b91] transition-colors"
                      >
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
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#e6e2e9] text-[#4b1b91] focus:ring-2 focus:ring-[#c07bfc] cursor-pointer"
                      />
                      <span className="text-sm text-[#635c8a] select-none">
                        Remember Me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-[#4b1b91] hover:text-[#c07bfc] transition-colors"
                    >
                      Forget Your Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#4b1b91] to-[#c07bfc] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    Log In
                  </button>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center" />
                  </div>
                </form>
                <div className="mt-8 text-center">
                  <button className="mt-4 text-xs text-[#635c8a] hover:text-[#4b1b91] font-medium transition-colors">
                    Demo: Skip to Dashboard →
                  </button>
                </div>
              </div>
);
};

export default Login;