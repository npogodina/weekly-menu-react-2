import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom"; // Route will change to PrivateRoute to use auth0

import Navbar from "./components/Navbar";
import Dishes from "./components/dishes/Dishes";
import DishPage from "./components/dishes/DishPage";
import NewDishForm from "./components/dishes/NewDishForm";

import "./App.css";
import PropTypes from "prop-types";

const App = () => {
  const [dishList, setDishList] = useState([]);

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

  return (
    <div>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>

        <Switch>
          <Route exact path="/dishes/new" render={() => <NewDishForm />} />

          <Route
            exact
            path="/dishes"
            render={() => <Dishes dishList={dishList} />}
          />
          <Route
            exact
            path="/dishes/:dishId"
            render={() => <DishPage dishList={dishList} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
