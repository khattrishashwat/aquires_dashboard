import axios from "axios";
import store from "../redux";
import { setAccessToken, logout } from "../redux/store";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// ✅ Axios Instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Refresh Handling
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const getRemainingMs = (iso) => {
  if (!iso) return Infinity;
  const t = new Date(iso).getTime();
  return isFinite(t) ? t - Date.now() : Infinity;
};

// 🔁 Refresh API Call
const refreshAccessToken = async (refreshToken, accessToken) => {
  const res = await axios.post(
    `${API_BASE}/auth/generateNewAccessToken`,
    { refreshToken },
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
    }
  );

  const d = res.data?.data;
  if (!d?.accessToken) throw new Error("Invalid refresh response");

  // ✅ Update Redux
  store.dispatch(
    setAccessToken({
      accessToken: d.accessToken,
      accessExpiresAt: d.accessExpiresAt,
    })
  );

  onRefreshed(d.accessToken);
  return d.accessToken;
};

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const state = store.getState().auth;

  // ⏱ timing
  config.metadata = { startTime: new Date() };

  if (!state?.accessToken || !config.headers) return config;

  const remaining = getRemainingMs(state.accessExpiresAt);

  // 🟢 Token valid
  if (remaining > 2 * 60 * 1000) {
    config.headers.Authorization = `Bearer ${state.accessToken}`;
    return config;
  }

  // 🟡 About to expire (background refresh)
  if (remaining <= 2 * 60 * 1000 && remaining > 5 * 1000) {
    config.headers.Authorization = `Bearer ${state.accessToken}`;

    if (!isRefreshing) {
      isRefreshing = true;
      refreshAccessToken(state.refreshToken, state.accessToken)
        .finally(() => (isRefreshing = false));
    }

    return config;
  }

  // 🔴 Expired → wait for refresh
  if (remaining <= 5 * 1000) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken(
          state.refreshToken,
          state.accessToken
        );
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (err) {
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve) => {
      refreshSubscribers.push((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(api(config));
      });
    });
  }

  return config;
});

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // ⏱ response timing
    const endTime = new Date();
    const startTime = response.config.metadata?.startTime;

    if (startTime) {
      const duration = endTime - startTime;
      console.log(`⏱ ${response.config.url} → ${duration} ms`);
    }

    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Something went wrong";
    const originalRequest = error.config;

    console.error("API Error:", {
      status,
      message,
      url: originalRequest?.url,
    });

    // 🔴 401 → logout
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      Swal.fire({
        title: "Session Expired",
        text: "Please login again",
        icon: "warning",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        store.dispatch(logout());
        window.location.href = "/login";
      });

      return Promise.reject(error);
    }

    // 🟠 Other errors
    switch (status) {
      case 403:
        toast.error("Access Denied: " + message);
        break;

      case 404:
        toast.warn(message);
        break;

      case 429:
        toast.warn("Too many requests");
        break;

      case 500:
        toast.error("Server error: " + message);
        break;

      default:
        if (error.code === "ECONNABORTED")
          toast.error("Request timeout");
        else if (error.message === "Network Error")
          toast.error("Network error");
        else toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;