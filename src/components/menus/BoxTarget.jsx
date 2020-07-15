import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Card, Ref } from "semantic-ui-react";
import "./BoxTarget.css";
import CranberryCard from "./CranberryCard";

const BoxTarget = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  // const ref = useRef(null);
  // const [dish, setDish] = useState(null);

  const onDrop = (dishName, dishDate, dishMeal, boxDate, boxMeal) => {
    props.setDish(dishName, dishDate, dishMeal, boxDate, boxMeal);
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) =>
      onDrop(item.name, item.date, item.meal, props.date, props.meal),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Ref innerRef={drop}>
      <Table.Cell className={isOver ? "has-dish" : "no-dish"}>
        {/* {props.dish && ( */}
        <CranberryCard
          date={props.date}
          meal={props.meal}
          name={props.dishName}
          // id={props.dish}
          // id={(Math.random() * 1000).toFixed(0)}
        ></CranberryCard>
        {/* )} */}
      </Table.Cell>
    </Ref>
  );
};

export default BoxTarget;
