import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import httpClient from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("admin@bankacquire.com");
  const [password, setPassword] = useState("BankAdmin@2026");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
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
      // localStorage.setItem('authtoken', response.data?.data?.token);

      // if (rememberMe) {
      //   localStorage.setItem('rememberedEmail', email);
      // } else {
      //   localStorage.removeItem('rememberedEmail');
      // }

      toast.success("Login successful! Redirecting to dashboard...");
      navigate("/");
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
    // localStorage.setItem('authtoken', 'demo-token');
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
   
           <div className="tailwind css-uwf2km css-exq74d">
  <div className="min-h-screen bg-[#f5effb] flex items-center justify-center p-4 md:p-8">
    <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
      <div className="flex-1 px-8 py-12 md:px-16 md:py-16 flex flex-col">
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c07bfc] to-[#4b1b91] flex items-center justify-center shadow-lg shadow-purple/20">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-[#1a1339]">
              BankAcquire
            </span>
          </div>
        </div>
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
        <div className="mt-auto pt-8 flex items-center justify-between text-xs text-[#635c8a]">
          <p className="text-center text-center">
            Copyright © 2026 BankAcquire Enterprises LTD.
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#170d3f] via-[#4b1b91] to-[#c07bfc] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Effortlessly manage your team
            <br />
            and operations.
          </h2>
          <p className="text-white/90 text-lg mb-12">
            Log in to access your CRM dashboard and manage your team.
          </p>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <div className="w-full aspect-video bg-white/20 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-white/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-white/90 text-sm font-medium">
                    Dashboard Analytics Preview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        
  );
};

export default Login;
