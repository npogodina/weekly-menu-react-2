import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import dateformat from "dateformat";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

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
// import "./EditMenuPage.css";

const GroceryListPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(null);
  const [formFields, setFormFields] = useState([""]);

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
    values[i] = event.target.value;
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

  return (
    <Container className="cont">
      <Card fluid className="main">
        <Card.Content>
          <h2>Editing grocery list</h2>
          {formFields.map((item, idx) => {
            let placeholder = "Step " + (idx + 1);
            return (
              <Form.Group widths="equal">
                <div basic color="olive" id="plus-btn" onClick={addItem}>
                  <Icon fitted name="plus" size="large" />
                </div>

                <Form.Field>
                  <input
                    placeholder={placeholder}
                    onChange={(e) => onInputChange(idx, e)}
                    value={item.main}
                  />
                </Form.Field>
              </Form.Group>
            );
          })}

          {/* <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={3}></Grid.Column>
              <Grid.Column width={13}></Grid.Column>
            </Grid.Row>
          </Grid> */}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default GroceryListPage;
