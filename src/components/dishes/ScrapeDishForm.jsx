import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Select, Button, Card } from "semantic-ui-react";

const ScrapeDishPage = (props) => {
  const [sending, setSending] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  let history = useHistory();

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("Executing onFormSubmit");
    // console.log(process.env.REACT_APP_API_MENUS_INDEX);
    // setSending(true);
    // axios
    //   .post(process.env.REACT_APP_API_MENUS_INDEX, {
    //     userId: user.sub,
    //     startDate: startDate,
    //     familySize: familySize,
    //   })
    //   .then((response) => {
    //     setSending(false);
    //     console.log("Post request sent!");
    //     console.log(response);
    //     history.push(`/menus/${response.data.menuId}`);
    //     const message = `Successfully generated new menu`;
    //     const type = "success";
    //     props.setMessage(message, type);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //     setSending(false);
    //     const message = error.response.data;
    //     const type = "error";
    //     props.setMessage(message, type);
    //     // What should we do when we know the post request failed?
    //     // setErrorMessage(error.message);
    //   });
  };

  return (
    <Container className="cont">
      {sending && <Loading />}
      <Card fluid>
        <Card.Content>
          <h1>Making a new menu</h1>
          <h3>Please, select the start date for the next week's menu.</h3>
          <Form onSubmit={onFormSubmit}>
            <Form.Field></Form.Field>

            <Button type="submit" color="green">
              Generate Menu
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default ScrapeDishPage;
