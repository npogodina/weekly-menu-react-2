import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import dateformat from "dateformat";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table } from "semantic-ui-react";
// import "./EditMenuPage.css";

const EditMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(null);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}/98c138ef-764c-4ba5-b589-2cf0435478c2`
      )
      .then((response) => {
        const apiMenuList = response.data.menu;
        const apiStartDate = response.data.startDate;
        setMenu(apiMenuList);
        setStartDate(apiStartDate);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const setDish = (dishName, dishDate, dishMeal, boxDate, boxMeal) => {
    let copiedMenu = { ...menu };
    copiedMenu[boxDate][boxMeal] = dishName;
    copiedMenu[dishDate][dishMeal] = null;
    setDishes(copiedMenu);
  };

  let menuLines = null;
  let menuLinesToRender = null;

  if (menu && startDate) {
    const dates = [startDate];
    for (let i = 1; i < 7; i++) {
      let day = new Date(startDate);
      day.setDate(day.getDate() + i);
      dates.push(day.toISOString());
    }
    menuLines = (dates, menu) => {
      return dates.map((day, i) => {
        return (
          <Table.Row>
            <Table.Cell>{dateformat(day, "m/d ddd")}</Table.Cell>
            <BoxTarget
              date={day}
              meal={"breakfast"}
              dishName={menu[day]["breakfast"]}
              setDish={setDish}
            ></BoxTarget>
            <BoxTarget
              date={day}
              meal={"lunch"}
              dishName={menu[day]["lunch"]}
              setDish={setDish}
            ></BoxTarget>
            <BoxTarget
              date={day}
              meal={"dinner"}
              dishName={menu[day]["dinner"]}
              setDish={setDish}
            ></BoxTarget>
          </Table.Row>
        );
      });
    };
    menuLinesToRender = <Table.Body>{menuLines(dates, menu)}</Table.Body>;
  }

  /////////////////////
  const [recipes, setRecipes] = useState([
    { name: "Orange Pie", id: 1 },
    { name: "Orange Scone", id: 2 },
  ]);
  const [dishes, setDishes] = useState([null, null, null]);

  const recipeCards = recipes.map((recipe) => {
    return <CranberryCard name={recipe.name} id={recipe.id} key={recipe.key} />;
  });
  /////////////////////

  return (
    <Container className="cont">
      {recipeCards}
      {menu && (
        <div>
          <h2>Here's what we suggest!</h2>
          <Table definition celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2} />
                <Table.HeaderCell width={4}>Breakfast</Table.HeaderCell>
                <Table.HeaderCell width={4}>Lunch</Table.HeaderCell>
                <Table.HeaderCell width={4}>Dinner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {menuLinesToRender}
          </Table>
        </div>
      )}
    </Container>
  );
};

export default EditMenuPage;
