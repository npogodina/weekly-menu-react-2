import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Button } from "semantic-ui-react";

const NewMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  const [startDate, setStartDate] = useState(new Date());

  const onDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <Container className="cont">
      <h2>Please, select the start date for the next week's menu.</h2>
      <Form onSubmit="onFormSubmit">
        <DatePicker selected={startDate} onChange={onDateChange} />
        <div className="cont">
          <Button type="submit">Generate menu!</Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewMenuPage;
