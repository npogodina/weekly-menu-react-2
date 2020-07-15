import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../../utils/items";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Card, Ref } from "semantic-ui-react";
// import "./EditMenuPage.css";

const EditMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  // const ref = useRef(null);
  const [recipes, setRecipes] = useState([
    { name: "Orange Pie", id: 1 },
    { name: "Orange Scone", id: 2 },
  ]);
  const [dishes, setDishes] = useState([null, null, null]);

  const setDish = (dishId, boxId) => {
    let updatedDishes = [...dishes];
    console.log(dishes);
    let filteredDishes = updatedDishes.map((dish) => {
      if (dish && dish === dishId) {
        console.log(dish, dishId);
        return (dish = null);
      }
    });
    filteredDishes[boxId] = dishId;
    setDishes(filteredDishes);
  };

  const recipeCards = recipes.map((recipe) => {
    return <CranberryCard name={recipe.name} id={recipe.id} key={recipe.key} />;
  });

  return (
    <Container className="cont">
      {recipeCards}

      <Table definition celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            {/* <div ref={drag}> */}
            <Table.HeaderCell width={5}>Breakfast</Table.HeaderCell>
            {/* </div> */}
            <Table.HeaderCell width={5}>Lunch</Table.HeaderCell>
            <Table.HeaderCell width={5}>Dinner</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>2020/7/7</Table.Cell>
            <BoxTarget id={0} dish={dishes[0]} setDish={setDish}></BoxTarget>
            <BoxTarget id={1} dish={dishes[1]} setDish={setDish}></BoxTarget>
            <BoxTarget id={2} dish={dishes[2]} setDish={setDish}></BoxTarget>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default EditMenuPage;
