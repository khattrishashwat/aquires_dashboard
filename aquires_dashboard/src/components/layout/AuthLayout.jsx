import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div id="container">
    <div>
      <div>
        <div className="tailwind css-uwf2km css-exq74d">
          <section
            aria-label="Notifications alt+T"
            tabIndex={-1}
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="false"
          />
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
                <Outlet />
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
      </div>
    </div>
  </div>
  );
};

export default AuthLayout;