import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Container, Card, Advertisement } from "semantic-ui-react";
import "./Home.css";

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
            <li className="home-banner-text-li">Let us make a menu</li>
            <li className="home-banner-text-li">Change what you don't like</li>
            <li className="home-banner-text-li">
              Tadam! Here's your menu and grocery list!
            </li>
          </ol>
          <p>Enjoy!</p>
        </div>
      </div>
      {/* <Card fluid id="home-card">
        <Card fluid id="home-card-inner">
          <Card.Content>
            <p>Hello and Welcome!</p>
            <p>How it works:</p>
            <ol>
              <li>Log in and add your dishes</li>
              <li>Let us make a menu out of them</li>
              <li>Change what you don't like</li>
              <li>Tadam! Here's your menu and your grocery list!</li>
            </ol>
            <p>What are you waiting for?</p>
          </Card.Content>
        </Card>
      </Card> */}
    </div>
  );
};

export default Home;
