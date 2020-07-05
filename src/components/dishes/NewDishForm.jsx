import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Form,
  Button,
  Checkbox,
  Select,
  Icon,
  Placeholder,
} from "semantic-ui-react";

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

  const [directions, setDirections] = useState([""]);

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

  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields,
    };
    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
  };

  const onSelectChange = (event, result) => {
    const newFormFields = {
      ...formFields,
    };
    const { name, value } = result;

    newFormFields[name] = value;
    setFormFields(newFormFields);
  };

  const onDirectionsChange = (i, event) => {
    const values = [...directions];
    values[i] = event.target.value;
    setDirections(values);
  };

  const addStep = () => {
    const values = [...directions];
    values.push("");
    setDirections(values);
  };

  let history = useHistory();
  const onFormSubmit = (event) => {
    event.preventDefault();

    const newFormFields = {
      ...formFields,
    };

    directions.forEach((step) => {
      if (step !== "") {
        newFormFields["directions"].push(step);
      }
    });

    console.log(newFormFields);

    axios
      .post(process.env.REACT_APP_API_DISHES_INDEX, formFields)
      .then((response) => {
        console.log("Post request sent!");
        history.push(`/dishes/`);
      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // setErrorMessage(error.message);
      });
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
        <Form.Select
          control={Select}
          label="How many servings?"
          placeholder="Servings"
          name="servings"
          selection
          options={options}
          onChange={onSelectChange}
          value={formFields.servings}
        />
        <h2>Directions:</h2>

        {/* <Button onClick={addStep}></Button> */}

        {directions.map((directions, idx) => {
          let placeholder = "Step " + (idx + 1);
          return (
            <Form.Group widths="equal">
              <Icon bordered name="plus" size="large" onClick={addStep} />

              <Form.Field>
                <input
                  placeholder={placeholder}
                  onChange={(e) => onDirectionsChange(idx, e)}
                />
              </Form.Field>
            </Form.Group>
          );
        })}

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default NewDishForm;
