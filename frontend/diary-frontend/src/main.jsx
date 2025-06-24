import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App/App";
import "./assets/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
