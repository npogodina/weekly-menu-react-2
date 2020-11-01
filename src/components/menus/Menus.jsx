import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { Loading } from "../Loading";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Card, Table, Button } from "semantic-ui-react";
import "./Menus.css";

import PropTypes from "prop-types";

const Menus = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [sending, setSending] = useState(true);
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    console.log("Calling useEffect");
    axios
      .get(process.env.REACT_APP_API_MENUS_INDEX, {
        params: {
          userId: user.sub,
        },
      })
      .then((response) => {
        const apiMenuList = response.data;
        setMenus(apiMenuList);
      })
      .catch((error) => {
        console.log(error.response.data);
        setSending(false);
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const makeComponents = (menus) => {
    return menus.map((menu, i) => {
      return (
        <Menu
          key={menu.menuId}
          menuId={menu.menuId}
          startDate={menu.startDate}
          timestamp={menu.timestamp}
          num={i + 1}
          resetMessage={props.resetMessage}
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
      
      <Card fluid id="menus-card">
        <Card.Content>
          <h1>Your menus:</h1>

          <Table compact id="menus-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Dates</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {!sending && (
              <Table.Row>
                <Table.Cell><p>You don't have any menus!</p></Table.Cell>
              </Table.Row>
            )}

            {menus.length > 0 && componentsToRender}
            {sending && menus.length === 0 && (
              <div>
                <Loading />
              </div>
            )}
          </Table>
        </Card.Content>
      </Card>
      
    </Container>
  );
};

export default Menus;
