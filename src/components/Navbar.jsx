import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Input, Menu, Segment } from "semantic-ui-react";

import PropTypes from "prop-types";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="dishes"
          active={activeItem === "dishes"}
          onClick={handleItemClick}
        >
          <Link to={`/dishes`}>Dishes</Link>
        </Menu.Item>
        <Menu.Item
          name="menu"
          active={activeItem === "menu"}
          onClick={handleItemClick}
        />
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
