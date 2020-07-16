import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import dateformat from "dateformat";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Grid, Button } from "semantic-ui-react";
// import "./EditMenuPage.css";

const GroceryListPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -11
        )}`
      )
      .then((response) => {
        const apiMenuList = response.data;
        const apiStartDate = response.data.startDate;
        setMenu(apiMenuList);
        setStartDate(apiStartDate);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  let history = useHistory();
  const onMenuSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -4
        )}`,
        {
          userId: user.sub,
          startDate: startDate,
          updatedMenu: menu,
        }
      )
      .then((response) => {
        history.push(`/menus/${response.data}`);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  return (
    <Container className="cont">
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={13}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default GroceryListPage;
