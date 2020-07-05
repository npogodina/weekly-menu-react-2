import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import LoginButton from "./LoginButton";

import { Input, Menu, Dropdown } from "semantic-ui-react";

import PropTypes from "prop-types";

const Navbar = () => {
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
        <Menu.Item>
          <LoginButton />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Navbar;
