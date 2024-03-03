import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserState } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserState>
    <App />
  </UserState>
  // </React.StrictMode>
);
