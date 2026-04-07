import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "sonner";

import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import NavigationProvider from "./contentApi/navigationProvider";
import SideBarToggleProvider from "./contentApi/sideBarToggleProvider";

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
    <QueryClientProvider client={queryClient}>
      
      <NavigationProvider>
        
        <Toaster position="top-right" />
        <Sonner position="top-right" richColors />

        <SideBarToggleProvider>
          <RouterProvider router={router} />
        </SideBarToggleProvider>

      </NavigationProvider>

    </QueryClientProvider>
  );
};

export default App;