import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom"; // Route will change to PrivateRoute to use auth0

import Dishes from "./components/dishes/Dishes";

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
      <h1>Hi!</h1>
      <BrowserRouter>
        {/* <header>
          <Navbar />
        </header> */}

        <Switch>
          <Route path="/dishes" render={() => <Dishes dishList={dishList} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
