import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";
import dateformat from "dateformat";
import "./MenuPage.css";

import {
  Container,
  Table,
  Button,
  List,
  Card,
  CardContent,
} from "semantic-ui-react";

const MenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();

  const [menu, setMenu] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(6)}`
      )
      .then((response) => {
        const apiMenuList = response.data;
        setMenu(apiMenuList);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  let menuLines = null;
  let menuLinesToRender = null;
  let groceryListLines = null;
  let groceryListToRender = null;

  if (menu) {
    const dates = [menu["startDate"]];
    for (let i = 1; i < 7; i++) {
      let day = new Date(menu["startDate"]);
      day.setDate(day.getDate() + i);
      dates.push(day.toISOString());
    }
    menuLines = (dates, menu) => {
      return dates.map((day) => {
        return (
          <Table.Row>
            <Table.Cell>{dateformat(day, "m/d ddd")}</Table.Cell>
            <Table.Cell>{menu["menu"][day]["breakfast"]}</Table.Cell>
            <Table.Cell>{menu["menu"][day]["lunch"]}</Table.Cell>
            <Table.Cell>{menu["menu"][day]["dinner"]}</Table.Cell>
          </Table.Row>
        );
      });
    };
    menuLinesToRender = <Table.Body>{menuLines(dates, menu)}</Table.Body>;

    if (menu["groceryListText"]) {
      groceryListLines = (menu) => {
        return menu["groceryListText"].map((item) => {
          return (
            <List.Item>
              <List.Icon
                name="check circle outline"
                size="large"
                verticalAlign="middle"
                color="green"
              />
              <List.Content>
                <List.Header>{item["main"]}</List.Header>
                <List.Description>{item["for"]}</List.Description>
              </List.Content>
            </List.Item>
          );
        });
      };
      groceryListToRender = <List relaxed>{groceryListLines(menu)}</List>;
    }
  }

  let history = useHistory();
  const onEditClick = () => {
    history.push(`/menus${location.pathname.slice(6)}/edit`);
    props.resetMessage();
  };

  const onGroceryListEditClick = () => {
    history.push(`/menus${location.pathname.slice(6)}/grocerylist`);
    props.resetMessage();
  };

  const onRedoClick = () => {
    axios
      .post(process.env.REACT_APP_API_MENUS_INDEX, {
        userId: user.sub,
        startDate: menu.startDate,
      })
      .then((response) => {
        console.log("Post request sent!");
        console.log(response);
        history.push(`/menus/${response.data.menuId}`);
        const message = `Successfully regenerated your menu`;
        const type = "success";
        props.setMessage(message, type);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  const onDeleteClick = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(6)}`
      )
      .then((response) => {
        history.push(`/menus/`);
        const message = `Successfully deleted your menu`;
        const type = "success";
        props.setMessage(message, type);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  const onGroceryListDeleteClick = () => {
    let emptyList = [];
    axios
      .patch(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(6)}`,
        {
          userId: user.sub,
          startDate: menu.startDate,
          updatedGroceryListText: emptyList,
        }
      )
      .then((response) => {
        console.log("Patch request sent to update grocery list text");
        let updatedMenu = { ...menu };
        updatedMenu.groceryListText = [];
        setMenu(updatedMenu);
        const message = `Successfully deleted the grocery list for this menu`;
        const type = "success";
        props.setMessage(message, type);
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
          {menu && (
            <div>
              <h2>Here's your menu for the week!</h2>
              <Table definition celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2} />
                    <Table.HeaderCell width={4}>Breakfast</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Lunch</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Dinner</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {menuLinesToRender}
              </Table>
              <h2>Happy?</h2>
              <Button.Group>
                <Button color="yellow" onClick={onEditClick}>
                  Edit
                </Button>
                <Button.Or />
                <Button color="orange" onClick={onRedoClick}>
                  Redo
                </Button>
                <Button.Or />
                <Button color="red" onClick={onDeleteClick}>
                  Delete
                </Button>
              </Button.Group>
              {menu["groceryListText"] && (
                <section className="mt-35">
                  <h2>Grocery List</h2>
                  <div styleName="width: 50%">
                    <Card id="groceryList">
                      {menu["groceryListText"].length > 0 && (
                        <CardContent>{groceryListToRender}</CardContent>
                      )}
                      {menu["groceryListText"].length === 0 && (
                        <CardContent>
                          <p>Nothing here.</p>
                        </CardContent>
                      )}

                      <div className="grocery-image"></div>
                    </Card>
                  </div>
                  <h2>Happy?</h2>
                  <Button.Group>
                    <Button color="yellow" onClick={onGroceryListEditClick}>
                      Edit
                    </Button>
                    <Button.Or />
                    {menu["groceryListText"].length > 0 && (
                      <Button color="red" onClick={onGroceryListDeleteClick}>
                        Delete
                      </Button>
                    )}
                    {menu["groceryListText"].length === 0 && (
                      <Button disabled>Delete</Button>
                    )}
                  </Button.Group>
                </section>
              )}
            </div>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default MenuPage;
