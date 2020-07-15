import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Switch, Route } from "react-router-dom"; // Route will change to PrivateRoute to use auth0
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dishes from "./components/dishes/Dishes";
import DishPage from "./components/dishes/DishPage";
import NewDishForm from "./components/dishes/NewDishForm";
import EditDishForm from "./components/dishes/EditDishForm";
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
  const { user, isAuthenticated } = useAuth0();
  const [dishList, setDishList] = useState([]);

  let dishCount = 0;
  if (dishList) {
    dishCount = dishList.length;
  }

  useEffect(() => {
    console.log("Use Effect call to get dishes");
    if (user) {
      axios
        .get(process.env.REACT_APP_API_DISHES_INDEX, {
          params: {
            userId: user.sub,
          },
        })
        .then((response) => {
          const apiDishList = response.data;
          setDishList(apiDishList);
        })
        .catch((error) => {
          // Still need to handle errors
          // setErrorMessage(error.message);
        });
    }
  }, user);

  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  const reloadDishes = () => {
    axios
      .get(process.env.REACT_APP_API_DISHES_INDEX, {
        params: {
          userId: user.sub,
        },
      })
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
          <Route exact path="/" component={() => <Home />}></Route>
          <ProtectedRoute
            exact
            path="/dishes/new"
            component={() => (
              <NewDishForm reloadDishes={reloadDishes} dishList={dishList} />
            )}
          />
          {/* <ProtectedRoute exact path="/dishes/new" component={NewDishForm} /> */}

          <ProtectedRoute
            exact
            path="/dishes"
            component={() => <Dishes dishList={dishList} />}
          />
          <ProtectedRoute
            exact
            path="/dishes/:dishId"
            component={() => (
              <DishPage dishList={dishList} reloadDishes={reloadDishes} />
            )}
          />
          <ProtectedRoute
            exact
            path="/dishes/:dishId/edit"
            component={() => <EditDishForm reloadDishes={reloadDishes} />}
          />
          <ProtectedRoute
            exact
            path="/menus/new"
            component={() => <NewMenuPage dishList={dishList} />}
          />
          <ProtectedRoute exact path="/menus" component={() => <Menus />} />
          <Route
            exact
            path="/menus/edit"
            component={() => <EditMenuPage dishList={dishList} />}
          />
          <ProtectedRoute
            exact
            path="/menus/:menuId"
            component={() => <MenuPage />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
