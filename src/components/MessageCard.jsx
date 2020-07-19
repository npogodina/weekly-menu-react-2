import React from "react";
import PropTypes from "prop-types";

const MessageCard = (props) => {
  return (
    <div className="cont">
      {props.message.type === "error" && (
        <div className="ui container mt mb">
          <div className="ui negative message">
            <div className="header">Error detected:</div>
            <p>{props.message.data}</p>
          </div>
        </div>
      )}
      {props.message.type === "success" && (
        <div className="ui container mt mb">
          <div className="ui positive message">
            <div className="header">Success!</div>
            <p>{props.message.data}</p>
          </div>
        </div>
      )}
    </div>
  );
};

MessageCard.propTypes = {
  message: PropTypes.string,
};

export default MessageCard;
