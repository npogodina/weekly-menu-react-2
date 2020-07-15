import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Card, Ref } from "semantic-ui-react";
import "./BoxTarget.css";

const BoxTarget = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  // const ref = useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    // drop: (item, monitor) => markAsDone(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Ref innerRef={drop}>
      <Table.Cell className={isOver ? "has-dish" : "no-dish"}></Table.Cell>
    </Ref>
  );
};

export default BoxTarget;
