import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "semantic-ui-react";

const ProfileSmall = (props) => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user.picture);

  return (
    isAuthenticated && (
      <div>
        <Image src={user.picture} avatar />
        <span>{user.name}'s Meal Planner</span>
      </div>
    )
  );
};

export default ProfileSmall;
