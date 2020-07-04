import React, { useState } from "react";

import { Form } from "semantic-ui-react";

import PropTypes from "prop-types";

const NewDishForm = (props) => {
  const [formFields, setFormFields] = useState({
    name: "",
    breakfast: false,
    lunch: false,
    dinner: false,
    other: false,
    servings: 1,
    directions: [],
    ingredients: [],
  });

  return <div>New!</div>;
};

export default NewDishForm;
