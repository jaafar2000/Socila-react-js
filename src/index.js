import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SocialContextProvider from "./context/socialContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocialContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </SocialContextProvider>
);
