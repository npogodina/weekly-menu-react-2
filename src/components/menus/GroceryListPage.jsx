import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import dateformat from "dateformat";

import GroceryItem from "./GroceryItem";

import { useAuth0 } from "@auth0/auth0-react";
import {
  Container,
  Table,
  Grid,
  Button,
  Card,
  Form,
  Icon,
} from "semantic-ui-react";
import "./GroceryListPage.css";

const GroceryListPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(null);
  const [formFields, setFormFields] = useState([{}]);

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
        setMenu(apiMenuList);
        setFormFields(response.data.groceryListText);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const onInputChange = (i, event) => {
    const values = [...formFields];
    values[i][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const addItem = () => {
    const values = [...formFields];
    values.push("");
    setFormFields(values);
  };

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

  const onFormSubmit = (event) => {
    event.preventDefault();
    let updatedMenu = { ...menu };
    updatedMenu.groceryListText = formFields;
    setMenu(updatedMenu);

    axios
      .post(process.env.REACT_APP_API_MENUS_INDEX, menu)
      .then((response) => {
        console.log("Post request sent!");
        history.back();
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  return (
    <Container className="cont">
      <Card fluid className="main">
        <Card.Content>
          <h2>Editing grocery list</h2>
          <Grid columns={2}>
            <Grid.Row className="grocery-list-subheader">
              <Grid.Column>
                <h3>Item:</h3>
              </Grid.Column>
              <Grid.Column>
                <h3>For:</h3>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Form onSubmit={onFormSubmit}>
            {formFields.map((item, idx) => {
              return (
                <GroceryItem
                  item={item}
                  idx={idx}
                  onInputChange={onInputChange}
                />
              );
            })}
            <Button type="submit">Submit</Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default GroceryListPage;
