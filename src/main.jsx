import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import Router from "./Router/Router.jsx";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(

  

  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={Router}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
  </StrictMode>
);
