import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, changeTextarea, subscribe} from "./redux/state";
import state from "./redux/state";

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <App state={state} addPost={addPost} changeTextarea={changeTextarea}/>,
        document.getElementById('root')
    );
}

rerenderEntireTree()

subscribe(rerenderEntireTree)