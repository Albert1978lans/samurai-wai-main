import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import App from "./App";
import ReactDOM from "react-dom";

ReactDOM.render(
    <React.StrictMode>

        <Provider store={store}>
            <App/>
        </Provider>

    </React.StrictMode>,
    document.getElementById('root')
)
