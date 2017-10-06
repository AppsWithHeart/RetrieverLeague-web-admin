
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.css';

import { configureAxios } from "./utils/net";

configureAxios();

ReactDOM.render(<App />, document.getElementById("root"));
