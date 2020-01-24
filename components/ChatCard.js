import React from "react";
import Image from "react-bootstrap/Image";

export default function ChatCard(props) {
  return (
    <a  key={props.match.messages.slice(-1)[0]}
      className="chat-card d-flex align-items-center py-2 pr-4"
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
        <p className="mb-0"> { (props.match.messages.slice(-1)[0]) ? props.match.messages.slice(-1)[0].text : "" } </p>
        {/* <p className="mb-0">Reason you connected</p> */}
      </div>
    </a>
  );
}
