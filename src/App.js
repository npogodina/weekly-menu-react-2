import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Switch, Route } from "react-router-dom"; // Route will change to PrivateRoute to use auth0
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

import Navbar from "./components/Navbar";
import Dishes from "./components/dishes/Dishes";
import DishPage from "./components/dishes/DishPage";
import NewDishForm from "./components/dishes/NewDishForm";
import Menus from "./components/menus/Menus";
import NewMenuPage from "./components/menus/NewMenuPage";
import EditMenuPage from "./components/menus/EditMenuPage";
import MenuPage from "./components/menus/MenuPage";
import { Loading } from "./components/Loading";

import "./App.css";
import PropTypes from "prop-types";

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace((appState && appState.returnTo) || window.location.pathname);
};

const App = () => {
  const [dishList, setDishList] = useState([]);

  let dishCount = 0;
  if (dishList) {
    dishCount = dishList.length;
  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DISHES_INDEX)
      .then((response) => {
        const apiDishList = response.data;
        setDishList(apiDishList);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  const reloadDishes = () => {
    axios
      .get(process.env.REACT_APP_API_DISHES_INDEX)
      .then((response) => {
        const apiDishList = response.data;
        setDishList(apiDishList);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <Router history={history}>
        <header>
          <Navbar />
        </header>
        {/* <Profile dishCount={dishCount} /> */}

        <Switch>
          <ProtectedRoute
            exact
            path="/dishes/new"
            component={() => (
              <NewDishForm reloadDishes={reloadDishes} dishList={dishList} />
            )}
          />
          {/* <Route exact path="/dishes/new" component={NewDishForm} /> */}

          <Route
            exact
            path="/dishes"
            component={() => <Dishes dishList={dishList} />}
          />
          <ProtectedRoute
            exact
            path="/dishes/:dishId"
            component={() => <DishPage dishList={dishList} />}
          />
          <Route
            exact
            path="/menus/new"
            component={() => <NewMenuPage dishList={dishList} />}
          />
          <Route exact path="/menus" component={() => <Menus />} />
          <Route exact path="/menus/:menuId" component={() => <MenuPage />} />
          <Route
            exact
            path="/menus/new/edit"
            component={() => <EditMenuPage dishList={dishList} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
