import React from "react";

export default function ChatCard() {
  return (
    <div className="chat-card py-2 border-bottom border-dark">
      <h4>Name</h4>
      <p className="mb-0">Last message chunk</p>
      <p className="mb-0">Reason you connected</p>
    </div>
  );
}
