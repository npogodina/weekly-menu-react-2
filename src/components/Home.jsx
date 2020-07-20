import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Item, Card, Container } from "semantic-ui-react";
import "./Home.css";
import Nataliya from "../img/nataliya.jpg";

import PropTypes from "prop-types";

const Home = (props) => {
  let history = useHistory();

  return (
    <div>
      <h1 className="home-h1">Hello and welcome to Weekly Menu!</h1>
      <div className="home-banner">
        <div className="home-banner-text">
          <p className="home-banner-header">How it works:</p>
          <ol>
            <li className="home-banner-text-li">Add dishes</li>
            <li className="home-banner-text-li">Let us make the menu</li>
            <li className="home-banner-text-li">Change what you don't like</li>
            <li className="home-banner-text-li">
              Tadam! Here's your menu and grocery list!
            </li>
          </ol>
          <p>Enjoy!</p>
        </div>
      </div>

      <Container className="cont mt-35">
        {/* <Card fluid>
          <Card.Content> */}
        <Item.Group className="blog-post">
          <Item>
            <Item.Image
              size="small"
              src={Nataliya}
              circular
              className="avatar"
            />

            <Item.Content>
              <Item.Header>Nataliya</Item.Header>
              <Item.Description>
                <p>Thank you for visiting Weekly Menu!</p>
                <p>This is my Capstone project for Ada Developers Academy.</p>
                <p>
                  If you like the app and want to use it, please go ahead! I
                  plan to keep working on the project and add more features, and
                  I have no intention to turn it off. You are also very welcome
                  to reach out with any feedback using the contact information
                  on the bottom of the page.
                </p>
                <p>
                  If you're interested in technical details, please check my
                  <span> </span>
                  <a
                    target="_blank"
                    href="https://github.com/npogodina/weekly-menu-sls"
                  >
                    Github
                  </a>
                  . The back end was made using AWS serverless stack: AWS Lambda
                  (JS), API Gateway and DynamoDB. The front end is in React.
                </p>
                <p>
                  Ada Developers Academy is a non-profit tuition-free intensive
                  coding school for women and gender diverse people. It combines
                  six months of classroom training with a five month internship
                  at Seattle tech companies. As a culmination of the classroom
                  learning experience, students create a Capstone project where
                  they are encouraged to learn and implement new technologies.
                  For more information about Ada please visit <span> </span>
                  <a target="_blank" href="https://adadevelopersacademy.org/">
                    the school's homepage
                  </a>
                  .
                </p>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        {/* </Card.Content>
        </Card> */}
      </Container>
    </div>
  );
};

export default Home;
