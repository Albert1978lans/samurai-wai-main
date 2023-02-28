import React from 'react';
import './index.css';
import {renderTree} from "./render";
import store from "./redux/redux-store";
// debugger
store.subscribe(renderTree)
renderTree()

