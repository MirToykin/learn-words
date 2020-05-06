import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "./redux/store/configureStore";

const rootElement = document.getElementById('root');
const store = configureStore();

let render = () => {
  ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, rootElement);
}

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  })
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
