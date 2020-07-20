import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Container,
  Segment,
  Grid,
  List,
  Header,
  Icon,
} from "semantic-ui-react";
import "./Footer.css";

import PropTypes from "prop-types";

const Footer = (props) => {
  const { user, isAuthenticated } = useAuth0();

  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    props.resetMessage();
  };

  return (
    <Segment inverted color="green" vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header
                inverted
                as="h4"
                content="Weekly Menu"
                classname="footer-header"
              />
              <List link inverted className="footer-links">
                <List.Item as="a">Dishes</List.Item>
                <List.Item as="a">Add Dish</List.Item>
                <List.Item as="a">Menus</List.Item>
                <List.Item as="a">New Menu</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Connect" />
              <List link inverted>
                <List.Item as="a" href="https://nataliyap.com/" target="_blank">
                  <Icon name="home" classname="footer-icon" />
                  Portfolio
                </List.Item>
                <List.Item
                  as="a"
                  href="https://github.com/npogodina/"
                  target="_blank"
                >
                  <Icon name="github" classname="footer-icon" />
                  Github
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.linkedin.com/in/npogodina/"
                  target="_blank"
                >
                  <Icon name="linkedin" classname="footer-icon" />
                  LinkedIn
                </List.Item>
                <List.Item
                  as="a"
                  href="https://adadevelopersacademy.org/"
                  target="_blank"
                >
                  Ada Developers Academy
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                What's on our mind
              </Header>
              <p>
                Thank you for visiting Weekly Menu! Quarantine is a great time
                to practise meal planning. Hope this app will help make this
                task easier.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
