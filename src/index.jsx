import React from "react";
import { HashRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import App from "./App.jsx";

ReactDOM.render(<HashRouter>
    <App />
</HashRouter>, document.getElementById("app"));