import React, { useState } from "react";
import Dish from "./Dish";

import { Container, Table } from "semantic-ui-react";

import PropTypes from "prop-types";

const Dishes = (props) => {
  const [filter, setFilter] = useState("All");

  const makeComponents = (dishes) => {
    return dishes.map((dish) => {
      return (
        <Dish
          key={dish.dishId}
          id={dish.dishId}
          name={dish.name}
          timestamp={dish.timestamp}
          servings={dish.servings}
          recipe={dish.recipe}
          breakfast={dish.breakfast}
          lunch={dish.lunch}
          dinner={dish.dinner}
          other={dish.other}
        />
      );
    });
  };

  const dishes = props.dishList;

  const components = makeComponents(dishes);
  const componentsToRender = <Table.Body>{components}</Table.Body>;

  return (
    <Container className="cont">
      <h1>Your dishes:</h1>

      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Meals</Table.HeaderCell>
            <Table.HeaderCell>Servings</Table.HeaderCell>
            <Table.HeaderCell>Recipe?</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {componentsToRender}
      </Table>
    </Container>
  );
};

export default Dishes;
