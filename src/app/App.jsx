import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Main } from "../routes/Main";
import { RootReducer } from "../global/RootReducer";

export const App = () => {
    return (
        <Provider store={RootReducer}>
            <React.Fragment>
                <Main />
            </React.Fragment>
        </Provider>
    );
};


