import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Container,
  Card,
  Form,
  Button,
  Checkbox,
  Select,
  Icon,
  Message,
} from "semantic-ui-react";

// import "./EditDishForm.css";

import PropTypes from "prop-types";

const EditDishForm = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();

  const [directions, setDirections] = useState([""]);
  const [ingredients, setIngredients] = useState([{}]);
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

  useEffect(() => {
    console.log("Calling useEffect");
    axios
      .get(
        `${process.env.REACT_APP_API_DISHES_INDEX}${location.pathname.slice(
          7,
          -4
        )}`
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        let newFormFields = {
          userId: user.sub,
          name: data.name,
          breakfast: data.breakfast === "n" ? false : true,
          lunch: data.lunch === "n" ? false : true,
          dinner: data.dinner === "n" ? false : true,
          other: data.other === "n" ? false : true,
          servings: data.servings,
          directions: [],
          ingredients: [],
        };
        setFormFields(newFormFields);
        setDirections(data.directions);
        if (data.ingredients.length > 0) {
          setIngredients(data.ingredients);
        } else {
          setIngredients([{}]);
        }
      })
      .catch((error) => {
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  // onChange callbacks:
  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields,
    };
    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
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
    const newFormFields = {
      ...formFields,
    };
    const { name, value } = result;
    newFormFields[name] = value;
    setFormFields(newFormFields);
  };

  const onCheckboxChange = (event, data) => {
    const newFormFields = {
      ...formFields,
    };
    newFormFields[data.name] = data.checked;
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
    console.log(event.target.value);
    values[i][event.target.name] = [event.target.value][0].toLowerCase();
    setIngredients(values);
  };

  const addIngredient = () => {
    const values = [...ingredients];
    values.push({});
    setIngredients(values);
  };

  // Validation handling
  const [errorMessage, setErrorMessage] = useState([]);
  const errorMessageBlob = (
    <Message error header="Not that fast!" list={errorMessage} />
  );

  // onSubmit
  let history = useHistory();
  const onFormSubmit = (event) => {
    event.preventDefault();
    let updatedErrorMessage = [];
    let error = false;

    if (formFields.name === "") {
      let message = "Dish name cannot be empty. Honestly, what's that?";
      updatedErrorMessage.push(message);
      setErrorMessage(updatedErrorMessage);
      error = true;
    }

    const newFormFields = {
      ...formFields,
    };

    // Needs refactor
    if (newFormFields["breakfast"]) {
      newFormFields["breakfast"] = "y";
    } else {
      newFormFields["breakfast"] = "n";
    }

    if (newFormFields["lunch"]) {
      newFormFields["lunch"] = "y";
    } else {
      newFormFields["lunch"] = "n";
    }

    if (newFormFields["dinner"]) {
      newFormFields["dinner"] = "y";
    } else {
      newFormFields["dinner"] = "n";
    }

    if (newFormFields["other"]) {
      newFormFields["other"] = "y";
    } else {
      newFormFields["other"] = "n";
    }

    directions.forEach((step) => {
      if (step !== "") {
        newFormFields["directions"].push(step);
      }
    });

    const regex = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    ingredients.forEach((ingredient) => {
      if (ingredient["name"] && ingredient["name"] !== "") {
        newFormFields["ingredients"].push(ingredient);
      }
      if (ingredient["amount"] && ingredient["name"]) {
        if (!regex.test(ingredient["amount"])) {
          let message = `${ingredient.name}: amount should be a number.`;
          updatedErrorMessage.push(message);
          setErrorMessage(updatedErrorMessage);
          error = true;
          return;
        }
      }
    });

    if (error === true) {
      return;
    }

    console.log(newFormFields);
    setFormFields(newFormFields);

    axios
      .post(process.env.REACT_APP_API_DISHES_INDEX, newFormFields)
      .then((response) => {
        console.log("Post request sent!");
        props.reloadDishes();
        history.push(`/dishes/`);
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
          {errorMessage.length !== 0 && errorMessageBlob}
          <h1>Adding awesome new dish!</h1>
          <Form onSubmit={onFormSubmit}>
            <Form.Field width={8}>
              <label>Recipe Name</label>
              <input
                placeholder="Example: Cranberry Orange Pie"
                name="name"
                onChange={onInputChange}
                value={formFields.name}
              />
            </Form.Field>
            <Form.Select
              width={2}
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
              <Checkbox
                label="Breakfast"
                name="breakfast"
                checked={formFields.breakfast}
                onChange={onCheckboxChange}
                className="form-checkbox"
              />
              <Checkbox
                label="Lunch"
                name="lunch"
                checked={formFields.lunch}
                onChange={onCheckboxChange}
                className="form-checkbox"
              />
              <Checkbox
                label="Dinner"
                name="dinner"
                checked={formFields.dinner}
                onChange={onCheckboxChange}
                className="form-checkbox"
              />
              <Checkbox
                label="Other"
                name="other"
                checked={formFields.other}
                onChange={onCheckboxChange}
                className="form-checkbox"
              />
            </Form.Group>

            <h2>Directions:</h2>
            {directions.map((directions, idx) => {
              let placeholder = "Step " + (idx + 1);
              return (
                <Form.Group widths="equal">
                  <div basic color="olive" id="plus-btn" onClick={addStep}>
                    <Icon fitted name="plus" size="large" />
                  </div>

                  <Form.Field>
                    <input
                      placeholder={placeholder}
                      onChange={(e) => onDirectionsChange(idx, e)}
                      value={directions}
                    />
                  </Form.Field>
                </Form.Group>
              );
            })}

            <h2>Ingredients:</h2>
            {ingredients.map((ingredients, idx) => {
              let placeholder = "Ingredient " + (idx + 1);
              return (
                <Form.Group>
                  <div
                    basic
                    color="olive"
                    id="plus-btn"
                    onClick={addIngredient}
                  >
                    <Icon fitted name="plus" size="large" />
                  </div>

                  <Form.Field width={2}>
                    <input
                      name="amount"
                      placeholder="1"
                      onChange={(e) => onIngredientsChange(idx, e)}
                      value={ingredients.amount || null}
                    />
                  </Form.Field>

                  <Form.Field width={4}>
                    <input
                      name="measurement"
                      placeholder="lbs"
                      onChange={(e) => onIngredientsChange(idx, e)}
                      value={ingredients.measurement || null}
                    />
                  </Form.Field>

                  <Form.Field width={6}>
                    <input
                      name="name"
                      placeholder="cranberries"
                      onChange={(e) => onIngredientsChange(idx, e)}
                      value={ingredients.name || null}
                    />
                  </Form.Field>
                </Form.Group>
              );
            })}

            <Button type="submit">Submit</Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default EditDishForm;