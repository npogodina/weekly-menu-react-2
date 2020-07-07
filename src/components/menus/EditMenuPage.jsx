import React, { useState } from "react";

// import { useAuth0 } from "@auth0/auth0-react";
import { Container, Table } from "semantic-ui-react";

const EditMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();

  return (
    <Container className="cont">
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
            <Table.Cell>None</Table.Cell>
            <Table.Cell>Resets rating to default value</Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default EditMenuPage;
