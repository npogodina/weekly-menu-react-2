import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateformat from "dateformat";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Button, Table, Card } from "semantic-ui-react";

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
        // const message = `Successfully generated new menu`;
        // const type = "success";
        // props.setMessage(message, type);
        setMenu(response.data.menu);
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
            <Table.Cell>{dateformat(day, "m/d ddd")}</Table.Cell>
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
      <Card fluid>
        <Card.Content>
          {!menu && (
            <div>
              <h2>Please, select the start date for the next week's menu.</h2>
              <Form onSubmit={onFormSubmit}>
                <Form.Field>
                  <DatePicker selected={startDate} onChange={onDateChange} />
                </Form.Field>
                <Button type="submit">Generate Menu</Button>
              </Form>
            </div>
          )}

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
              <h2>Happy?</h2>
              <Button.Group>
                <Button color="green">Yes!</Button>
                <Button.Or />
                <Button color="yellow">Edit</Button>
                <Button.Or />
                <Button color="orange">Redo</Button>
                <Button.Or />
                <Button color="red">Cancel</Button>
              </Button.Group>
            </div>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default NewMenuPage;
