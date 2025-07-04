import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App/App";
import { UserProvider } from './contexts/UserContext';
import "./assets/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><BrowserRouter><UserProvider><App /></UserProvider></BrowserRouter></React.StrictMode>);
