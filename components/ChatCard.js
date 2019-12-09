import React from "react";
import Image from "react-bootstrap/Image";

export default function ChatCard(props) {
  return (
    <a
      className="chat-card d-flex align-items-center py-2"
      onClick={props.onClick}
    >
      <div>
        <Image
          src="/static/pusheen.jpg"
          className="img-thumbnail rounded-circle mr-3"
        />
      </div>
      <div className="d-none d-md-block">
        <h4>{props.match.name}</h4>
        <p className="mb-0">Last message chunk</p>
        <p className="mb-0">Reason you connected</p>
      </div>
    </a>
  );
}
