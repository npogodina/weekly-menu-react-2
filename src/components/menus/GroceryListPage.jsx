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
  Image,
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

  const checkOff = (i) => {
    const values = [...formFields];
    values[i]["checkedOff"] = true;
    setFormFields(values);
  };

  const addItem = () => {
    const values = [...formFields];
    values.push("");
    setFormFields(values);
  };

  let history = useHistory();
  const onFormSubmit = () => {
    let filteredFormFields = [];
    formFields.forEach((item) => {
      if (!item.checkedOff) {
        filteredFormFields.push(item);
      }
    });
    axios
      .patch(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -11
        )}`,
        {
          userId: user.sub,
          startDate: menu.startDate,
          updatedGroceryListText: filteredFormFields,
        }
      )
      .then((response) => {
        console.log("Patch request sent to update grocery list text");
        history.push(`/menus${location.pathname.slice(6, -12)}`);
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
          <Card id="grocery-list-card">
            <Card.Content>
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
                      checkOff={checkOff}
                    />
                  );
                })}
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Content>
            <div className="grocery-image"></div>
          </Card>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default GroceryListPage;
