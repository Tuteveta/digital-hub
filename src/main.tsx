import React from "react";
import ReactDOM from "react-dom/client";
import WelcomePage from "./WelcomePage.tsx";  // ← No curly braces
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WelcomePage />
  </React.StrictMode>
);