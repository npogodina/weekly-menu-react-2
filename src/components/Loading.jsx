import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

export function Loading() {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
  // <div className="text-center">
  //   <div className="spinner-border" role="status">
  //     <span className="sr-only">Loading...</span>
  //   </div>
  // </div>
  // );
}
