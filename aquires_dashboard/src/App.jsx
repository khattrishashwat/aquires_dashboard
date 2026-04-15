import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import { Toaster as Sonner } from "sonner";
import NavigationProvider from "./contentApi/navigationProvider";
import SideBarToggleProvider from "./contentApi/sideBarToggleProvider";
import { AuthProvider } from "./contexts/AuthContext";

import { Provider } from "react-redux";
import store from "./redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationProvider>
            <ToastContainer position="top-right" />
            <Sonner position="top-right" richColors />

            <SideBarToggleProvider>
              <RouterProvider router={router} />
            </SideBarToggleProvider>
          </NavigationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;