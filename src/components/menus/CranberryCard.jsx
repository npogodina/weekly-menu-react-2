import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/items";

import { Card, Ref } from "semantic-ui-react";
import "./CranberryCard.css";

const CranberryCard = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      name: props.name,
      date: props.date,
      meal: props.meal,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // begin: (monitor) => resetBoxDish(),
  });

  return (
    <Ref innerRef={drag}>
      <Card fluid id="test-card">
        {/* <Card fluid id="test-card" color={isDragging ? "orange" : "green"}> */}
        <Card.Content id="test-card-content">{props.name}</Card.Content>
      </Card>
    </Ref>
  );
};

export default CranberryCard;
