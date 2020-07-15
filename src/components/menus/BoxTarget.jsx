import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";

import { Table, Ref } from "semantic-ui-react";
import "./BoxTarget.css";

import CranberryCard from "./CranberryCard";

const BoxTarget = (props) => {
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
      <Table.Cell
        positive={props.dishName ? true : false}
        negative={props.dishName ? false : true}
        id={isOver ? "droppable" : "no-dish"}
      >
        {props.dishName && (
          <CranberryCard
            date={props.date}
            meal={props.meal}
            name={props.dishName}
          ></CranberryCard>
        )}
      </Table.Cell>
    </Ref>
  );
};

export default BoxTarget;
