import React, { useState, useEffect } from "react";
import Dish from "./Dish";
import Profile from "../Profile";

import { Container, Table, Button, Card } from "semantic-ui-react";

import PropTypes from "prop-types";

const Dishes = (props) => {
  const [filter, setFilter] = useState("All");

  const makeComponents = (dishes) => {
    return dishes.map((dish) => {
      return (
        <Dish
          key={dish.dishId}
          dishId={dish.dishId}
          name={dish.name}
          timestamp={dish.timestamp}
          servings={dish.servings}
          directions={dish.directions}
          ingredients={dish.ingredients}
          breakfast={dish.breakfast}
          lunch={dish.lunch}
          dinner={dish.dinner}
          other={dish.other}
        />
      );
    });
  };

  const allDishComponents = makeComponents(props.dishList);
  let breakfasts = [];
  let lunches = [];
  let dinners = [];
  let other = [];
  let breakfastDishComponents = [];
  let lunchDishComponents = [];
  let dinnerDishComponents = [];
  let otherDishComponents = [];

  props.dishList.forEach((dish) => {
    if (dish.lunch[0] === "y") {
      lunches.push(dish);
    }
    if (dish.breakfast[0] === "y") {
      breakfasts.push(dish);
    }
    if (dish.dinner[0] === "y") {
      dinners.push(dish);
    }
    if (dish.other[0] === "y") {
      other.push(dish);
    }

    breakfastDishComponents = makeComponents(breakfasts);
    lunchDishComponents = makeComponents(lunches);
    dinnerDishComponents = makeComponents(dinners);
    otherDishComponents = makeComponents(other);
  });

  let componentsToRender = null;

  const applyFilter = (event) => {
    setFilter(event.target.name);
  };

  if (filter === "Breakfast") {
    componentsToRender = <Table.Body>{breakfastDishComponents}</Table.Body>;
  } else if (filter === "Lunch") {
    componentsToRender = <Table.Body>{lunchDishComponents}</Table.Body>;
  } else if (filter === "Dinner") {
    componentsToRender = <Table.Body>{dinnerDishComponents}</Table.Body>;
  } else if (filter === "Other") {
    componentsToRender = <Table.Body>{otherDishComponents}</Table.Body>;
  } else {
    componentsToRender = <Table.Body>{allDishComponents}</Table.Body>;
  }

  return (
    <Container className="cont">
      <Card fluid>
        <Card.Content>
          <h1>Your dishes:</h1>

          {/* <Profile /> */}
          <div className="">
            <Button.Group color="green">
              <Button className="" name="Breakfast" onClick={applyFilter}>
                Breakfast
              </Button>
              <Button className="" name="Lunch" onClick={applyFilter}>
                Lunch
              </Button>
              <Button className="" name="Dinner" onClick={applyFilter}>
                Dinner
              </Button>
              <Button className="" name="All" onClick={applyFilter}>
                All
              </Button>
            </Button.Group>
          </div>

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
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Dishes;
