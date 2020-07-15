import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../../utils/items";

import CranberryCard from "./CranberryCard";
import BoxTarget from "./BoxTarget";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Card, Ref } from "semantic-ui-react";
// import "./EditMenuPage.css";

const EditMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  // const ref = useRef(null);

  return (
    <Container className="cont">
      <CranberryCard name="Cranberry Scone"></CranberryCard>
      <CranberryCard name="Cranberry Pie"></CranberryCard>
      {/* <div ref={drag} className={isDragging ? "dragging" : ""}>
        <Card id="test-card">
          <Card.Content id="test-card-content">Cranberry Pie</Card.Content>
        </Card>
      </div>
      <div ref={drag} className={isDragging ? "dragging" : ""}>
        <Card id="test-card">
          <Card.Content id="test-card-content">Cranberry Scone</Card.Content>
        </Card>
      </div> */}

      <Table definition celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            {/* <div ref={drag}> */}
            <Table.HeaderCell width={5}>Breakfast</Table.HeaderCell>
            {/* </div> */}
            <Table.HeaderCell width={5}>Lunch</Table.HeaderCell>
            <Table.HeaderCell width={5}>Dinner</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>2020/7/7</Table.Cell>
            <BoxTarget></BoxTarget>
            <Table.Cell></Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default EditMenuPage;
