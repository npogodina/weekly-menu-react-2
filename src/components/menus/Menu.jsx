import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Table } from "semantic-ui-react";

import PropTypes from "prop-types";

const Menu = (props) => {
  let history = useHistory();

  function handleClick(e) {
    // e.preventDefault();
    history.push(`/menus/${props.menuId}`);
  }

  return (
    <Table.Row className="" onClick={handleClick}>
      <Table.Cell>
        <Link to={`/menus/${props.menuId}`}>Menu</Link>
      </Table.Cell>
      <Table.Cell>{props.startDate}</Table.Cell>
    </Table.Row>
  );
};

export default Menu;
