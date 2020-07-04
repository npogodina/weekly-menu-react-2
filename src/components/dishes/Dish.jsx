import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

const Dish = (props) => {

  let history = useHistory();

  function handleClick(e) {
    // e.preventDefault();
    history.push(`/dishes/${props.id}`)
  }

  let meals = [];

  if (props.meals) {
    props.meals.forEach(meal => {
      meals.push(meal.name);
    });
  };

  return (
    <tr className="list-group-item-action" onClick={handleClick}>
      <th scope="row"> <Link to={`/dishes/${props.id}`}>{props.name}</Link> </th>
      <th scope="row"> {meals.join(", ")} </th>
      <th scope="row"> {props.servings} </th>
      <th scope="row"> {props.recipe? "Yes!" : "N/A"} </th>
    </tr>
  );
};

export default Dish;
