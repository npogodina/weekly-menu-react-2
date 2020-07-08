import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const API = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience:
            "https://am54xet7t0.execute-api.us-west-2.amazonaws.com/dev",
          scope: "read:current_user",
        });
        console.log(token);
        const response = await fetch(
          "https://am54xet7t0.execute-api.us-west-2.amazonaws.com/dev/dishes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDishes(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!dishes) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {dishes.map((dish, index) => {
        return <li key={index}>{dish.name}</li>;
      })}
    </ul>
  );
};

export default API;
