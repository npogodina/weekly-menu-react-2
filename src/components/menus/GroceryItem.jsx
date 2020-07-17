import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Form, Icon, Grid } from "semantic-ui-react";
import "./GroceryItem.css";

import PropTypes from "prop-types";

const GroceryItem = (props) => {
  const [checkedOff, setCheckedOff] = useState(false);

  const toggleItem = () => {
    setCheckedOff(!checkedOff);
    props.checkOff(props.idx);
  };

  // const onInputChange = (i, event) => {

  // };

  return (
    <Form.Group widths="equal" id="grocery-form">
      {!checkedOff && (
        <div className="icon-div">
          <Icon
            name="check circle outline"
            size="large"
            id="grocery-checkmark"
            onClick={toggleItem}
            className={checkedOff ? "checked-off-icon" : "not-checked-off-icon"}
          />
          <Icon
            name="check circle"
            size="large"
            id="grocery-checkmark-checked"
            onClick={toggleItem}
          />
        </div>
      )}
      {checkedOff && (
        <Icon
          name="check circle"
          size="large"
          id="grocery-checkmark"
          onClick={toggleItem}
        />
      )}

      <Form.Field>
        <input
          onChange={(e) => props.onInputChange(props.idx, e)}
          value={props.item.main}
          className={checkedOff ? "checked-off" : "not-checked-off"}
          name="main"
          id="grocery-form-main"
        />
      </Form.Field>

      <Form.Field>
        <input
          onChange={(e) => props.onInputChange(props.idx, e)}
          value={props.item.for}
          className={checkedOff ? "checked-off" : "not-checked-off"}
          name="for"
          id="grocery-form-for"
        />
      </Form.Field>
    </Form.Group>
  );
};

export default GroceryItem;
