import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

import { Container, Table } from "semantic-ui-react";

const MenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();

  const [menu, setMenu] = useState([]);
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

  return (
    <Container className="cont">
      <Table definition celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={5}>Breakfast</Table.HeaderCell>
            <Table.HeaderCell width={5}>Lunch</Table.HeaderCell>
            <Table.HeaderCell width={5}>Dinner</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>2020/7/7</Table.Cell>
            <Table.Cell>None</Table.Cell>
            <Table.Cell>Resets rating to default value</Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default MenuPage;
