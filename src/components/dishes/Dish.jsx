import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Table } from "semantic-ui-react";

import PropTypes from "prop-types";

const Dish = (props) => {
  let history = useHistory();

  function handleClick(e) {
    // e.preventDefault();
    history.push(`/dishes/${props.dishId}`);
  }

  let meals = [];

  if (props.meals) {
    props.meals.forEach((meal) => {
      meals.push(meal.name);
    });
  }

  return (
    <Table.Row className="" onClick={handleClick}>
      <Table.Cell>
        <Link to={`/dishes/${props.dishId}`}>{props.name}</Link>
      </Table.Cell>
      <Table.Cell>{meals.join(", ")}</Table.Cell>
      <Table.Cell>{props.servings}</Table.Cell>
      <Table.Cell>{props.recipe ? "Yes!" : "N/A"}</Table.Cell>
    </Table.Row>
  );
};

export default Dish;
