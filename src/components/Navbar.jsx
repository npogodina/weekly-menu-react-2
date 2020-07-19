import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ProfileSmall from "./ProfileSmall";

import { Input, Menu, Dropdown, Container } from "semantic-ui-react";
import "./Navbar.css";

import PropTypes from "prop-types";

const Navbar = (props) => {
  const { user, isAuthenticated } = useAuth0();

  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    props.resetMessage();
  };

  return (
    <div className="navbar-image">
      <div className="navbar-filler"></div>
      <div className="navbar">
        <Menu>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          >
            <Link to={`/`}>Home</Link>
          </Menu.Item>
          <Dropdown item text="Dishes">
            <Dropdown.Menu>
              <Dropdown.Item
                name="dishes"
                active={activeItem === "dishes"}
                onClick={handleItemClick}
              >
                <Link to={`/dishes`}>Dishes</Link>
              </Dropdown.Item>

              <Dropdown.Item
                name="dishes"
                active={activeItem === "dishes"}
                onClick={handleItemClick}
              >
                <Link to={`/dishes/new`}>Add Dish</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text="Menus">
            <Dropdown.Menu>
              <Dropdown.Item
                name="menus"
                active={activeItem === "menus"}
                onClick={handleItemClick}
              >
                <Link to={`/menus`}>Menus</Link>
              </Dropdown.Item>

              <Dropdown.Item
                name="menus"
                active={activeItem === "menus"}
                onClick={handleItemClick}
              >
                <Link to={`/menus/new`}>New Menu</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {!isAuthenticated && (
            <Menu.Menu position="right">
              <Menu.Item>
                <LoginButton />
              </Menu.Item>
            </Menu.Menu>
          )}

          {isAuthenticated && (
            <Menu.Menu position="right">
              <Menu.Item>
                <ProfileSmall />
                {/* <Input icon="search" placeholder="Search..." /> */}
              </Menu.Item>
              <Menu.Item>
                <LogoutButton />
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </div>
      <div className="navbar-filler-2"></div>
    </div>
  );
};

export default Navbar;
