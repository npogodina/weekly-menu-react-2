import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Button } from "semantic-ui-react";

const NewMenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [startDate, setStartDate] = useState(new Date());

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
        // props.reloadDishes();
        // history.push(`/dishes/`);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  return (
    <Container className="cont">
      <h2>Please, select the start date for the next week's menu.</h2>
      <Form onSubmit={onFormSubmit}>
        <Form.Field>
          <DatePicker selected={startDate} onChange={onDateChange} />
        </Form.Field>
        <Button type="submit">Generate Menu</Button>
      </Form>
    </Container>
  );
};

export default NewMenuPage;
