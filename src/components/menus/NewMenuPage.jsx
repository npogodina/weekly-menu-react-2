import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Button, Table } from "semantic-ui-react";

const NewMenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [startDate, setStartDate] = useState(new Date());
  const [menu, setMenu] = useState(null);

  const onDateChange = (date) => {
    setStartDate(date);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("Executing onFormSubmit");
    console.log(process.env.REACT_APP_API_MENUS_INDEX);
    axios
      .post(process.env.REACT_APP_API_MENUS_INDEX, {
        userId: user.sub,
        startDate: startDate,
      })
      .then((response) => {
        console.log("Post request sent!");
        console.log(response);
        setMenu(response.data.menu);
        // props.reloadDishes();
        // history.push(`/dishes/`);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  const dates = [startDate.toISOString()];
  for (let i = 1; i < 7; i++) {
    let day = new Date(startDate);
    day.setDate(day.getDate() + i);
    dates.push(day.toISOString());
  }

  console.log(dates);

  let menuLines = null;
  let menuLinesToRender = null;

  if (menu) {
    menuLines = (dates, menu) => {
      return dates.map((day) => {
        return (
          <Table.Row>
            <Table.Cell>{day}</Table.Cell>
            <Table.Cell>{menu[day]["breakfast"]}</Table.Cell>
            <Table.Cell>{menu[day]["lunch"]}</Table.Cell>
            <Table.Cell>{menu[day]["dinner"]}</Table.Cell>
          </Table.Row>
        );
      });
    };

    menuLinesToRender = <Table.Body>{menuLines(dates, menu)}</Table.Body>;
  }

  return (
    <Container className="cont">
      <h2>Please, select the start date for the next week's menu.</h2>
      <Form onSubmit={onFormSubmit}>
        <Form.Field>
          <DatePicker selected={startDate} onChange={onDateChange} />
        </Form.Field>
        <Button type="submit">Generate Menu</Button>
      </Form>

      {menu && (
        <Table definition celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} />
              <Table.HeaderCell width={5}>Breakfast</Table.HeaderCell>
              <Table.HeaderCell width={5}>Lunch</Table.HeaderCell>
              <Table.HeaderCell width={5}>Dinner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {menuLinesToRender}
          {/* <Table.Row>
              <Table.Cell>{startDate.toISOString()}</Table.Cell>
              <Table.Cell>
                {menu[startDate.toISOString()]["breakfast"]}
              </Table.Cell>
              <Table.Cell>{menu[startDate.toISOString()]["lunch"]}</Table.Cell>
              <Table.Cell>{menu[startDate.toISOString()]["dinner"]}</Table.Cell>
            </Table.Row> */}
        </Table>
      )}
    </Container>
  );
};

export default NewMenuPage;
