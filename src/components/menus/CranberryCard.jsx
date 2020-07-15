import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/items";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Card, Ref } from "semantic-ui-react";
import "./CranberryCard.css";

const CranberryCard = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  // const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      name: props.name,
      id: props.id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // begin: (monitor) => resetBoxDish(),
  });

  return (
    <Ref innerRef={drag}>
      <Card id="test-card" color={isDragging ? "green" : "orange"}>
        <Card.Content id="test-card-content">{props.name}</Card.Content>
      </Card>
    </Ref>
  );
};

export default CranberryCard;
