import React, { useState } from "react";
import Dish from "./Dish";

import PropTypes from "prop-types";

const Dishes = (props) => {
  const [filter, setFilter] = useState("All");

  const makeComponents = (dishes) => {
    return dishes.map((dish) => {
      return <Dish key={dish.dishId} id={dish.dishId} name={dish.name} />;
    });
  };

  const dishes = props.dishList;

  const components = makeComponents(dishes);
  const componentsToRender = <tbody>{components}</tbody>;

  return (
    <div className="container mt-5">
      <h1>The Dishes:</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Meals</th>
            <th scope="col">Servings</th>
            <th scope="col">Recipe?</th>
          </tr>
        </thead>
        {componentsToRender}
      </table>
    </div>
  );
};

export default Dishes;
