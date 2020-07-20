import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import dateformat from "dateformat";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Grid, Button } from "semantic-ui-react";
import "./EditMenuPage.css";

const EditMenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [familySize, setFamilySize] = useState(null);

  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -4
        )}`
      )
      .then((response) => {
        const apiMenuList = response.data.menu;
        const apiStartDate = response.data.startDate;
        const apiFamilySize = response.data.familySize;
        setMenu(apiMenuList);
        setStartDate(apiStartDate);
        setFamilySize(apiFamilySize);
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const setDish = (dishName, dishDate, dishMeal, boxDate, boxMeal) => {
    let copiedMenu = { ...menu };
    copiedMenu[boxDate][boxMeal] = dishName;
    if (dishDate) {
      copiedMenu[dishDate][dishMeal] = null;
    }
    setMenu(copiedMenu);
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

  const [filter, setFilter] = useState("Breakfast");

  const makeDishCards = (dishes) => {
    return dishes.map((dish) => {
      return <CranberryCard name={dish.name} key={dish.id} />;
    });
  };

  let breakfasts = [];
  let lunches = [];
  let dinners = [];
  let breakfastDishComponents = [];
  let lunchDishComponents = [];
  let dinnerDishComponents = [];

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

    breakfastDishComponents = makeDishCards(breakfasts);
    lunchDishComponents = makeDishCards(lunches);
    dinnerDishComponents = makeDishCards(dinners);
  });

  let cardsToRender = null;

  const applyFilter = (event) => {
    setFilter(event.target.name);
  };

  if (filter === "Breakfast") {
    cardsToRender = <Table.Body>{breakfastDishComponents}</Table.Body>;
  } else if (filter === "Lunch") {
    cardsToRender = <Table.Body>{lunchDishComponents}</Table.Body>;
  } else if (filter === "Dinner") {
    cardsToRender = <Table.Body>{dinnerDishComponents}</Table.Body>;
  }

  let history = useHistory();
  const onMenuSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -4
        )}`,
        {
          userId: user.sub,
          startDate: startDate,
          familySize: familySize,
          updatedMenu: menu,
        }
      )
      .then((response) => {
        history.push(`/menus/${response.data}`);
        const message = `Successfully updated your menu`;
        const type = "success";
        props.setMessage(message, type);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  const onCancel = () => {
    history.push(`/menus${location.pathname.slice(6, -5)}`);
  };

  return (
    <Container className="cont">
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={3}>
            <h2>Your dishes:</h2>
            <div className="">
              <Button.Group
                color="green"
                size="small"
                className="edit-menu-btn-group"
              >
                <Button className="" name="Breakfast" onClick={applyFilter}>
                  B
                </Button>
                <Button className="" name="Lunch" onClick={applyFilter}>
                  L
                </Button>
                <Button className="" name="Dinner" onClick={applyFilter}>
                  D
                </Button>
              </Button.Group>
            </div>
            {cardsToRender}
          </Grid.Column>
          <Grid.Column width={13}>
            {menu && (
              <div>
                <h2>Your menu:</h2>
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
                {/* <Button type="submit" onClick={onMenuSubmit}>
                  Update Menu
                </Button> */}
                <Button.Group>
                  <Button type="Reset" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button.Or />
                  <Button positive type="Submit" onClick={onMenuSubmit}>
                    Update menu
                  </Button>
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default EditMenuPage;
