import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { user, isAuthenticated } = useAuth0();
  const [formFields, setFormFields] = useState({
    userId: user.sub,
    name: "",
    breakfast: false,
    lunch: false,
    dinner: false,
    other: false,
    servings: 1,
    directions: [],
    ingredients: [],
  });

  const [directions, setDirections] = useState([""]);
  const [ingredients, setIngredients] = useState([{}]);

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

  const onCheckboxChange = (event) => {
    const newFormFields = {
      ...formFields,
    };
    newFormFields[event.target.name] = !newFormFields[event.target.name];
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

  const onIngredientsChange = (i, event) => {
    const values = [...ingredients];
    values[i][event.target.name] = [event.target.value][0];
    setIngredients(values);
  };

  const addIngredient = () => {
    const values = [...ingredients];
    values.push({});
    setIngredients(values);
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

    ingredients.forEach((ingredient) => {
      if (ingredient.name !== "") {
        newFormFields["ingredients"].push(ingredient);
      }
    });

    console.log(newFormFields);

    // axios
    //   .post(process.env.REACT_APP_API_DISHES_INDEX, formFields)
    //   .then((response) => {
    //     console.log("Post request sent!");
    //     history.push(`/dishes/`);
    //   })
    //   .catch((error) => {
    //     // What should we do when we know the post request failed?
    //     // setErrorMessage(error.message);
    //   });
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

        <Form.Group inline>
          <label>Meal:</label>
          <Form.Field
            control="input"
            label="Breakfast"
            type="checkbox"
            name="breakfast"
            // checked={value === "breakfast"}
            onChange={onCheckboxChange}
          />
          <Form.Field
            control="input"
            label="Lunch"
            type="checkbox"
            name="lunch"
            // checked={value === "lunch"}
            onChange={onCheckboxChange}
          />
          <Form.Field
            control="input"
            label="Dinner"
            type="checkbox"
            name="dinner"
            // checked={value === "dinner"}
            onChange={onCheckboxChange}
          />
          <Form.Field
            control="input"
            label="Other"
            type="checkbox"
            name="other"
            // checked={value === "other"}
            onChange={onCheckboxChange}
          />
        </Form.Group>

        <h2>Directions:</h2>
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

        <h2>Ingredients:</h2>
        {ingredients.map((ingredients, idx) => {
          let placeholder = "Ingredient " + (idx + 1);
          return (
            <Form.Group widths="equal">
              <Icon bordered name="plus" size="large" onClick={addIngredient} />

              <Form.Field>
                <input
                  name="amount"
                  placeholder="1"
                  onChange={(e) => onIngredientsChange(idx, e)}
                />
              </Form.Field>

              <Form.Field>
                <input
                  name="measurement"
                  placeholder="lbs"
                  onChange={(e) => onIngredientsChange(idx, e)}
                />
              </Form.Field>

              <Form.Field>
                <input
                  name="name"
                  placeholder="cranberries"
                  onChange={(e) => onIngredientsChange(idx, e)}
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
