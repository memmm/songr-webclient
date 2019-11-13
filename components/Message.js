import React from "react";

export default function Message(props) {
  return (
    <div className="message-bubble rounded p-2 m-3 ml-auto">
      {props.message}
    </div>
  );
}
