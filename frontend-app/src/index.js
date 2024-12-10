import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import Bubbles from './components/Bubbles/Bubbles';
import './styles/reset.css'
import './styles/common.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Bubbles /> */}
    <App />
  </React.StrictMode>
);
