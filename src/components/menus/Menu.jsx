import React from "react";
import { Link, useHistory } from "react-router-dom";
import dateformat from "dateformat";

import { Table } from "semantic-ui-react";

import PropTypes from "prop-types";

const Menu = (props) => {
  let history = useHistory();

  function handleClick(e) {
    // e.preventDefault();
    history.push(`/menus/${props.menuId}`);
  }

  let start = dateformat(props.startDate, "m/d ddd");
  let end = new Date(props.startDate);
  end.setDate(end.getDate() + 6);
  end = dateformat(end, "m/d ddd");

  return (
    <Table.Row className="" onClick={handleClick}>
      <Table.Cell>
        <Link to={`/menus/${props.menuId}`}>Menu {props.num}</Link>
      </Table.Cell>
      <Table.Cell>
        {start} - {end}
      </Table.Cell>
    </Table.Row>
  );
};

export default Menu;
