import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Container, Grid, Image } from "semantic-ui-react";

const Profile = (props) => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user.picture);

  return (
    isAuthenticated && (
      <Container className="cont">
        <Card fluid color="olive">
          <Card.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Image rounded src={user.picture} alt={user.name} />
                </Grid.Column>
                <Grid.Column width={14}>
                  <h2>
                    {user.name}
                    <small>'s Meal Planner</small>
                  </h2>
                  <p>Dishes: {props.dishCount} | Menus: 0</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Container>
    )
  );
};

export default Profile;
