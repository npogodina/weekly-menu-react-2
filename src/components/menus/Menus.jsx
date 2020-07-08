import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";

import { Container, Table, Button } from "semantic-ui-react";

import PropTypes from "prop-types";

const Menus = (props) => {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_MENUS_INDEX)
      .then((response) => {
        const apiMenuList = response.data;
        setMenus(apiMenuList);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const makeComponents = (menus) => {
    return menus.map((menu, i) => {
      return (
        <Menu
          key={menu.menuId}
          dishId={menu.menuId}
          startDate={menu.startDate}
          timestamp={menu.timestamp}
          num={i + 1}
        />
      );
    });
  };

  let componentsToRender = null;
  if (menus) {
    componentsToRender = makeComponents(menus);
  }

  return (
    <Container className="cont">
      <h1>Your menus:</h1>

      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Dates</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {componentsToRender}
      </Table>
    </Container>
  );
};

export default Menus;
