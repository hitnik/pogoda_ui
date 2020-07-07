import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "semantic-ui-css/semantic.min.css";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';

const Root = ({ store }) => (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )

ReactDOM.render((<Root store={store}/>), document.getElementById("root"));