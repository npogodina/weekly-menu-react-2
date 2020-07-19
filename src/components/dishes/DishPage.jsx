import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Card,
  Grid,
  Image,
  List,
  Button,
  Divider,
  Message,
} from "semantic-ui-react";
import "./DishPage.css";
import LemonDivider from "../../img/divider-lemon.png";

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
        const message = `Successfully deleted dish ${dish.name}`;
        const type = "success";
        props.setMessage(message, type);
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
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <h1>{dish.name}</h1>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Card id="dish-image-card">
                    <Image
                      id="dish-image"
                      src="https://kyxarka.ru/wp-content/uploads/2018/12/1622.jpg"
                    />
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider horizontal>
              <img id="dish-divider-image" src={LemonDivider}></img>
            </Divider>

            <Grid id="grid">
              <Grid.Row>
                <Grid.Column width={5}>
                  <Message>
                    <h3>Servings: {dish.servings}</h3>
                  </Message>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Message>
                    <h3>Tags: {tags.join(", ")}</h3>
                  </Message>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Message id="dish-buttons-message">
                    <Button.Group fluid>
                      <Button
                        color="yellow"
                        onClick={onEditClick}
                        className="dish-button"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        onClick={onDeleteClick}
                        className="dish-button"
                      >
                        Delete
                      </Button>
                    </Button.Group>
                  </Message>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={5}>
                  <Message>
                    <h3>Ingredients:</h3>
                    <List>{ingredients}</List>
                  </Message>
                </Grid.Column>
                <Grid.Column width={11}>
                  <Message>
                    <h3>Directions:</h3>
                    <List ordered>{steps}</List>
                  </Message>
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
