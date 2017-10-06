import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./base/Header";
import Main from "./base/Main";
import store from "../store/";

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Main />
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}