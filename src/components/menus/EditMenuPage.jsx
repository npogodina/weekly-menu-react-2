import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table, Card } from "semantic-ui-react";
import "./EditMenuPage.css";

const EditMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();

  return (
    <DndProvider backend={Backend}>
      <Container className="cont">
        <Card id="test-card">
          <Card.Content id="test-card">Cranberry Pie</Card.Content>
        </Card>

        <Table definition celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} />
              <Table.HeaderCell width={5}>Breakfast</Table.HeaderCell>
              <Table.HeaderCell width={5}>Lunch</Table.HeaderCell>
              <Table.HeaderCell width={5}>Dinner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>2020/7/7</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </DndProvider>
  );
};

export default EditMenuPage;
