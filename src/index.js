import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App, { history } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState) => {
  history.replace((appState && appState.returnTo) || window.location.pathname);
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="weekly-menu.us.auth0.com"
      clientId="ZUlWNaGmI3ANjJsT1WPZJ0FDt7a9SJFw"
      onRedirectCallback={onRedirectCallback}
      //   audience="https://am54xet7t0.execute-api.us-west-2.amazonaws.com/dev"
      //   // scope="read:dishes"
      //   scope="read:current_user"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
