import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

  let history = useHistory();

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
        history.push(`/menus/${response.data.menuId}`);
        const message = `Successfully generated new menu`;
        const type = "success";
        props.setMessage(message, type);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  return (
    <Container className="cont">
      <Card fluid>
        <Card.Content>
          <h2>Please, select the start date for the next week's menu.</h2>
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <DatePicker selected={startDate} onChange={onDateChange} />
            </Form.Field>
            <Button type="submit">Generate Menu</Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default NewMenuPage;
