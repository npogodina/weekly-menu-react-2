import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Select, Button, Card } from "semantic-ui-react";

const NewMenuPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [startDate, setStartDate] = useState(new Date());
  const [familySize, setFamilySize] = useState("1");

  const onDateChange = (date) => {
    setStartDate(date);
  };

  const options = [
    { key: "1", text: "1", value: "1" },
    { key: "2", text: "2", value: "2" },
    { key: "3", text: "3", value: "3" },
    { key: "4", text: "4", value: "4" },
    { key: "5", text: "5", value: "5" },
    { key: "6", text: "6", value: "6" },
    { key: "7", text: "7", value: "7" },
    { key: "8", text: "8", value: "8" },
  ];
  const onSelectChange = (event, result) => {
    const { name, value } = result;
    // const newFamilySize = event.value;
    setFamilySize(value);
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
        familySize: familySize,
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
          <h1>Making a new menu</h1>
          <h3>Please, select the start date for the next week's menu.</h3>
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <DatePicker selected={startDate} onChange={onDateChange} />
            </Form.Field>

            <h3>For how many people will you be cooking?</h3>
            <Form.Select
              width={1}
              control={Select}
              name="family-size"
              selection
              options={options}
              onChange={onSelectChange}
              value={familySize}
            />
            <Button type="submit" color="green">
              Generate Menu
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default NewMenuPage;
