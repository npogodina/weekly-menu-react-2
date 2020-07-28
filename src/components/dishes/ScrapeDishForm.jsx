import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, Select, Button, Card } from "semantic-ui-react";

const ScrapeDishPage = (props) => {
  const [sending, setSending] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const [url, setUrl] = useState("");

  const onInputChange = (event) => {
    setUrl(event.target.value);
  };

  let history = useHistory();

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("Executing onFormSubmit");
    setSending(true);
    axios
      .post(
        "https://am54xet7t0.execute-api.us-west-2.amazonaws.com/dev/scraper",
        {
          dishUrl: url,
        }
      )
      .then((response) => {
        setSending(false);
        console.log("Post request sent!");
        console.log(response);
        // history.push(`/menus/${response.data.menuId}`);
        const message = `Successfully scraped a dish`;
        const type = "success";
        props.setMessage(message, type);
      })
      .catch((error) => {
        console.log(error.response.data);
        setSending(false);
        const message = error.response.data;
        const type = "error";
        props.setMessage(message, type);
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
  };

  return (
    <Container className="cont">
      {sending && <Loading />}
      <Card fluid>
        <Card.Content>
          <h1>Adding a dish from the Internet</h1>
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <label>
                <h3>Please, provide a URL to your dish.</h3>
              </label>
              <input
                placeholder="Example: https://www.allrecipes.com/recipe/212706/caramel-apple-cranberry-pie/"
                name="url"
                onChange={onInputChange}
                value={url}
                className="input-border"
              />
            </Form.Field>

            <Button type="submit" color="green">
              Get Dish Info
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default ScrapeDishPage;
