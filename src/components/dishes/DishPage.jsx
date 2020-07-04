import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Container, Grid, Image, List, Button } from "semantic-ui-react";

import PropTypes from "prop-types";

const DishPage = (props) => {
  let { dishId } = useParams();

  let dish = props.dishList.find((i) => {
    return i.dishId === dishId;
  });

  let tags = [];
  let steps = null;
  let ingredients = null;

  if (dish) {
    if (dish.breakfast[0] === "y") {
      tags.push("Breakfast");
    }
    if (dish.lunch[0] === "y") {
      tags.push("Lunch");
    }
    if (dish.dinner[0] === "y") {
      tags.push("Dinner");
    }
    if (dish.other[0] === "y") {
      tags.push("Other");
    }

    if (dish.directions) {
      steps = dish.directions.map((step, i) => {
        return <List.Item className="list-block"> {step}</List.Item>;
      });
    }

    if (dish.ingredients) {
      ingredients = dish.ingredients.map((ingredient) => {
        return (
          <List.Item className="list-block">
            {ingredient.amount}
            <span> </span>
            {ingredient.measurement && ingredient.measurement}
            <span> </span>
            {ingredient.name}
          </List.Item>
        );
      });
    }
  }

  // let ingredientComponents = []
  // if (dish) {
  //   if (dish.ingredients) {
  //     ingredientComponents = dish.ingredients.map((ingredient) => {
  //       return(
  //         <Ingredient key={ingredient.dishId} name={ingredient.name} quantity={ingredient.quantity} />
  //       );
  //     });
  //   };
  // }

  if (dish) {
    return (
      <Container className="cont">
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column>
              <h1>{dish.name}</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image src="https://myheartbeets.com/wp-content/uploads/2018/03/pressure-cooker-split-pea-soup.jpg" />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3>Servings: {dish.servings}</h3>
              <h3>Tags:</h3>
              <p>{tags.join(", ")}</p>
              <h3>Made: 5 times</h3>
              <Button color="orange">Edit</Button>
              <Button color="red">Delete</Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={6}>
              <h2>Ingredients:</h2>
              <List bulleted>{ingredients}</List>
            </Grid.Column>
            <Grid.Column width={10}>
              <h2>Directions:</h2>
              <List ordered>{steps}</List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default DishPage;
