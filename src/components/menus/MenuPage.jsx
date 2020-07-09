import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import dateformat from "dateformat";

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

    groceryListLines = (menu) => {
      let arr = [];
      Object.keys(menu["groceryList"]).forEach((item) => {
        arr.push(
          <List.Item>
            {/* <List.Icon name="github" size="large" verticalAlign="middle" /> */}
            <List.Content>
              <List.Header as="a">
                {item}: {menu["groceryList"][item][0]["amount"]}
              </List.Header>
              <List.Description as="a">Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
        );
      });
      return arr;
    };
    groceryListToRender = <List relaxed>{groceryListLines(menu)}</List>;
  }

  return (
    <Container className="cont">
      {menu && (
        <div>
          <h2>Here's what we suggest!</h2>
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
            <Button color="green">Yes!</Button>
            <Button.Or />
            <Button color="yellow">Edit</Button>
            <Button.Or />
            <Button color="orange">Redo</Button>
            <Button.Or />
            <Button color="red">Cancel</Button>
          </Button.Group>
          <h2>Grocery List</h2>
          <Card>
            <CardContent>{groceryListToRender}</CardContent>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default MenuPage;
