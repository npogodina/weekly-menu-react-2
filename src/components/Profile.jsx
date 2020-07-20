import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Card, Container, Grid, Image, List } from "semantic-ui-react";
import "./Profile.css";

const Profile = (props) => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user.picture);

  return (
    isAuthenticated && (
      <Container className="cont">
        <Card fluid className="profile-card">
          <Card.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Image
                    circular
                    src={user.picture}
                    alt={user.name}
                    className="profile-avatar"
                  />
                </Grid.Column>
                <Grid.Column width={12} className="profile-info">
                  <h2>
                    {user.name}
                    <small>'s Meal Planner</small>
                  </h2>
                  <h3>Dishes total: {props.dishCount}</h3>
                  <List bulleted>
                    <List.Item>
                      <p>Breakfast dishes: </p>
                    </List.Item>
                    <List.Item>
                      <p>Lunch dishes: </p>
                    </List.Item>
                    <List.Item>
                      <p>Dinner dishes: </p>
                    </List.Item>
                  </List>
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

{
  /* <div>
          <Container className="cont mt-35">
            <Card fluid>
              <Card.Content>
                <Item.Group className="blog-post">
                  <Item>
                    <Item.Image
                      size="small"
                      src={user.picture}
                      circular
                      className="avatar"
                    />

                    <Item.Content>
                      <Item.Header>Nataliya</Item.Header>
                      <Item.Description>
                        <p>Thank you for visiting Weekly Menu!</p>
                        <p>
                          This is my Capstone project for Ada Developers
                          Academy.
                        </p>
                        <p>
                          If you like the app and want to use it, please go
                          ahead! I plan to keep working on the project and add
                          more features, and I have no intention to turn it off.
                          You are also very welcome to reach out with any
                          feedback using the contact information on the bottom
                          of the page.
                        </p>
                        <p>
                          If you're interested in technical details, please
                          check my
                          <span> </span>
                          <a
                            target="_blank"
                            href="https://github.com/npogodina/weekly-menu-sls"
                          >
                            Github
                          </a>
                          . The back end was made using AWS serverless stack:
                          AWS Lambda (JS), API Gateway and DynamoDB. The front
                          end is in React.
                        </p>
                        <p>
                          Ada Developers Academy is a non-profit tuition-free
                          intensive coding school for women and gender diverse
                          people. It combines six months of classroom training
                          with a five month internship at Seattle tech
                          companies. As a culmination of the classroom learning
                          experience, students create a Capstone project where
                          they are encouraged to learn and implement new
                          technologies. For more information about Ada please
                          visit <span> </span>
                          <a
                            target="_blank"
                            href="https://adadevelopersacademy.org/"
                          >
                            the school's homepage
                          </a>
                          .
                        </p>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
            </Card>
          </Container>
        </div> */
}
