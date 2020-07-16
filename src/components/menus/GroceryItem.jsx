import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Form, Icon } from "semantic-ui-react";
import "./GroceryItem.css";

import PropTypes from "prop-types";

const GroceryItem = (props) => {
  const [checkedOff, setCheckedOff] = useState(false);

  const toggleItem = () => {
    setCheckedOff(!checkedOff);
  };

  const onInputChange = () => {};

  return (
    <Form.Group widths="equal">
      <div basic id="plus-btn" onClick={toggleItem}>
        <Icon fitted name="check circle" size="large" color="green" />
      </div>

      <Form.Field>
        <input
          onChange={(e) => onInputChange(props.idx, e)}
          value={props.item.main}
          className={checkedOff ? "checked-off" : "not-checked-off"}
        />
      </Form.Field>
    </Form.Group>
  );
};

export default GroceryItem;
