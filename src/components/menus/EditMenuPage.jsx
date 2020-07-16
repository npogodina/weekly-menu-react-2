import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import dateformat from "dateformat";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Grid, Button } from "semantic-ui-react";
// import "./EditMenuPage.css";

const EditMenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(null);
  const [startDate, setStartDate] = useState(null);

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

  // Display dishList as Cards
  let newDishCards = null;
  if (props.dishList) {
    newDishCards = props.dishList.map((dish) => {
      return <CranberryCard name={dish.name} key={dish.id} />;
    });
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
          updatedMenu: menu,
        }
      )
      .then((response) => {
        console.log("Post request sent!");
        history.push(`/dishes${location.pathname.slice(6, -4)}`);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  return (
    <Container className="cont">
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={3}>
            <h2>Your dishes:</h2>
            {newDishCards}
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
                <Button type="submit" onClick={onMenuSubmit}>
                  Update Menu
                </Button>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default EditMenuPage;
