import React, { useState } from "react";

import { Container, Form, Button, Checkbox } from "semantic-ui-react";

import PropTypes from "prop-types";

const NewDishForm = (props) => {
  const [formFields, setFormFields] = useState({
    name: "",
    breakfast: "no",
    lunch: "no",
    dinner: "no",
    other: "no",
    servings: 1,
    directions: [],
    ingredients: [],
  });

  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields,
    };
    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    //history.push(`/dishes/`)
  };

  return (
    <Container className="cont">
      <h1>Adding awesome new dish!</h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Field>
          <label>Recipe Name</label>
          <input
            placeholder="Example: Italian Baked Eggs"
            name="name"
            onChange={onInputChange}
            value={formFields.name}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default NewDishForm;
