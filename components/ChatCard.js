import React from "react";
import Image from "react-bootstrap/Image";

export default function ChatCard() {
  return (
    <div className="chat-card d-flex align-items-center py-2">
      <div>
        <Image
          src="/static/pusheen.jpg"
          className="img-thumbnail rounded-circle mr-3"
        />
      </div>
      <div className="d-none d-md-block">
        <h4>Name</h4>
        <p className="mb-0">Last message chunk</p>
        <p className="mb-0">Reason you connected</p>
      </div>
    </div>
  );
}
