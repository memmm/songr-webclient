import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Message from "./Message";

export default function ChatStream() {
  const initialMessage = [
    "Say hi to your new match or skip the conversation with the button above."
  ];
  const [value, setValue] = React.useState("");
  const [messages, setList] = React.useState(initialMessage);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function sendMessage(e) {
    if (value) setList(messages.concat(value));
    setValue("");
  }
  return (
    <div className="flex-grow-1 chat-stream p-md-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-end">
      <div>
        {messages.map((x, i) => (
          <Message key={i} message={x}></Message>
        ))}
      </div>
      <InputGroup className="">
        <FormControl
          placeholder="Message"
          aria-label="Message"
          onChange={handleChange}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={sendMessage}>
            SEND
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
