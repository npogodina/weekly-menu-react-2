import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ProfileSmall from "./ProfileSmall";

import { Input, Menu, Dropdown } from "semantic-ui-react";

import PropTypes from "prop-types";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();

  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div>
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
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

        <Menu.Item
          name="menu"
          active={activeItem === "menu"}
          onClick={handleItemClick}
        />

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
  );
};

export default Navbar;
