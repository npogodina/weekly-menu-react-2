import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import createAuth0Client from "@auth0/auth0-spa-js";

const auth0 = await createAuth0Client({
  domain: "weekly-menu.us.auth0.com",
  client_id: "ZUlWNaGmI3ANjJsT1WPZJ0FDt7a9SJFw",
});

document.getElementById("login").addEventListener("click", () => {
  auth0.loginWithPopup().then((token) => {
    //logged in. you can get the user profile like this:
    auth0.getUser().then((user) => {
      console.log(user);
    });
  });
});

export const Api = () => {
  // const { getAccessTokenSilently } = useAuth0();
  // const [dishes, setDishes] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const token = await getAccessTokenSilently({
  //         audience:
  //           "https://am54xet7t0.execute-api.us-west-2.amazonaws.com/dev",
  //         scope: "read:dishes",
  //       });
  //       console.log(token);
  //       const response = await fetch(
  //         "https://am54xet7t0.execute-api.us-west-2.amazonaws.com/dev/dishes",
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       setDishes(await response.json());
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, [getAccessTokenSilently]);

  // if (!dishes) {
  //   return <div>Loading...</div>;
  // }

  return (
    <button id="login">Click to Login</button>
    // <ul>
    //   {dishes.map((dish, index) => {
    //     return <li key={index}>{dish.name}</li>;
    //   })}
    // </ul>
  );
};
