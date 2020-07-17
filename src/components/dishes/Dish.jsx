import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Table } from "semantic-ui-react";
import "./Dish.css";

import PropTypes from "prop-types";

const Dish = (props) => {
  let history = useHistory();

  function handleClick(e) {
    // e.preventDefault();
    history.push(`/dishes/${props.dishId}`);
  }

  let meals = [];
  if (props.breakfast === "y") {
    meals.push("breakfast");
  }
  if (props.lunch === "y") {
    meals.push("lunch");
  }
  if (props.dinner === "y") {
    meals.push("dinner");
  }

  return (
    <Table.Row className="" onClick={handleClick}>
      <Table.Cell>
        <Link to={`/dishes/${props.dishId}`}>{props.name}</Link>
      </Table.Cell>
      <Table.Cell>{meals.join(", ")}</Table.Cell>
      <Table.Cell>{props.servings}</Table.Cell>
      <Table.Cell
        className={
          props.directions.length > 0 ? "yes-directions" : "no-directions"
        }
      >
        {props.directions.length > 0 ? "Yes!" : "N/A"}
      </Table.Cell>
    </Table.Row>
  );
};

export default Dish;
