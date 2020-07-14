import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import { Container, Card, Grid, Image, List, Button } from "semantic-ui-react";

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

  let history = useHistory();
  const location = useLocation();
  const onDeleteClick = () => {
    console.group(location.pathname.slice(7));
    axios
      .delete(
        `${process.env.REACT_APP_API_DISHES_INDEX}${location.pathname.slice(7)}`
      )
      .then((response) => {
        console.log("Dish deleted!");
        props.reloadDishes();
        history.push(`/dishes/`);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  const onEditClick = () => {
    history.push(`/dishes${location.pathname.slice(7)}/edit`);
  };

  if (dish) {
    return (
      <Container className="cont">
        <Card fluid>
          <Card.Content>
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
                  <Button color="orange" onClick={onEditClick}>
                    Edit
                  </Button>
                  <Button color="red" onClick={onDeleteClick}>
                    Delete
                  </Button>
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
          </Card.Content>
        </Card>
      </Container>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default DishPage;
