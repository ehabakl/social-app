import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CounterContextProvider from "./Context/CounterContext.jsx";
import TokenContextProvider from "./Context/TokenContext.jsx";
import PostContextProvider from "./Context/PostContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <TokenContextProvider>
      <PostContextProvider>
        <CounterContextProvider>
          <BrowserRouter>
            <StrictMode>
              <App />
            </StrictMode>
            <Toaster position="top-center" reverseOrder={false} />
          </BrowserRouter>
        </CounterContextProvider>
      </PostContextProvider>
    </TokenContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
