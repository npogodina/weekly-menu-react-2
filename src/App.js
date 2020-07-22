import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Switch, Route } from "react-router-dom"; // Route will change to PrivateRoute to use auth0
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MessageCard from "./components/MessageCard";
import Home from "./components/Home";
import Dishes from "./components/dishes/Dishes";
import DishPage from "./components/dishes/DishPage";
import NewDishForm from "./components/dishes/NewDishForm";
import EditDishForm from "./components/dishes/EditDishForm";
import Menus from "./components/menus/Menus";
import NewMenuPage from "./components/menus/NewMenuPage";
import EditMenuPage from "./components/menus/EditMenuPage";
import MenuPage from "./components/menus/MenuPage";
import GroceryListPage from "./components/menus/GroceryListPage";
import MenuPDF from "./components/menus/MenuPDF";
import GroceryListPDF from "./components/menus/GroceryListPDF";
import { Loading } from "./components/Loading";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  const [message, setMessage] = useState(null);

  const [dishList, setDishList] = useState([]);

  let dishCount = 0;
  if (dishList) {
    dishCount = dishList.length;
  }

  useEffect(() => {
    if (user) {
      console.log("Use Effect call to get dishes");
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
          console.log(error);
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

  const setMessageCallback = (data, type) => {
    setMessage({
      data,
      type,
    });
  };

  const resetMessageCallback = () => {
    setMessage(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="body-content">
        <Router history={history}>
          <header>
            <Navbar resetMessage={resetMessageCallback} />
          </header>

          <main className="main-content">
            {message && <MessageCard message={message} />}
            <Switch>
              <Route exact path="/" component={() => <Home />}></Route>
              <Route
                exact
                path="/dishes/new"
                component={() => (
                  <NewDishForm
                    reloadDishes={reloadDishes}
                    dishList={dishList}
                    setMessage={setMessageCallback}
                  />
                )}
              />
              {/* <Route exact path="/dishes/new" component={NewDishForm} /> */}

              <Route
                exact
                path="/dishes"
                component={() => (
                  <Dishes
                    dishList={dishList}
                    resetMessage={resetMessageCallback}
                  />
                )}
              />
              <Route
                exact
                path="/dishes/:dishId"
                component={() => (
                  <DishPage
                    dishList={dishList}
                    reloadDishes={reloadDishes}
                    setMessage={setMessageCallback}
                  />
                )}
              />
              <Route
                exact
                path="/dishes/:dishId/edit"
                component={() => (
                  <EditDishForm
                    reloadDishes={reloadDishes}
                    setMessage={setMessageCallback}
                  />
                )}
              />
              <Route
                exact
                path="/menus/new"
                component={() => (
                  <NewMenuPage
                    dishList={dishList}
                    setMessage={setMessageCallback}
                  />
                )}
              />
              <Route
                exact
                path="/menus"
                component={() => <Menus resetMessage={resetMessageCallback} />}
              />
              <Route
                exact
                path="/menus/:menuId"
                component={() => (
                  <MenuPage
                    setMessage={setMessageCallback}
                    resetMessage={resetMessageCallback}
                  />
                )}
              />
              <Route
                exact
                path="/menus/:menuId/pdf"
                component={() => <MenuPDF />}
              />
              <Route
                exact
                path="/menus/:menuId/edit"
                component={() => (
                  <EditMenuPage
                    dishList={dishList}
                    setMessage={setMessageCallback}
                  />
                )}
              />
              <Route
                exact
                path="/menus/:menuId/grocerylist"
                component={() => (
                  <GroceryListPage setMessage={setMessageCallback} />
                )}
              />
              <Route
                exact
                path="/menus/:menuId/grocerylist/pdf"
                component={() => <GroceryListPDF />}
              />
            </Switch>
          </main>
          <footer className="footer">
            <Footer resetMessage={resetMessageCallback} />
          </footer>
        </Router>
      </div>
    </DndProvider>
  );
};

export default App;
