import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/redux-store";
import StoreContext, {Provider} from "./StoreContext";


export const renderTree = () => {
    ReactDOM.render(
        <React.StrictMode>

            <Provider store={store}>
                <App/>
            </Provider>

            {/*<StoreContext.Provider value={store}>*/}
            {/*    <App/>*/}
            {/*</StoreContext.Provider>*/}

        </React.StrictMode>,
        document.getElementById('root')
    )
}