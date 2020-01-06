import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
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

  function submitOnEnter(e) {
    if (e.keyCode === 13) {
      sendMessage(e);
    }
  }

  function sendMessage(e) {
    if (value) setList(messages.concat(value));

    //temp user data
    let requestBody = {
        userId: "1",
        userName: "temp",
        message: value
    }

    //var response = axios.post("http://localhost:9090/sendmessage", requestBody);

    setValue("");
  }
  return (
    <div className="chat-stream flex-grow-1 p-md-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-end">
      <div className="overflow-auto">
        {messages.map((x, i) => (
          <Message key={i} message={x}></Message>
        ))}
      </div>
      <InputGroup className="">
        <FormControl
          placeholder="Message"
          aria-label="Message"
          onChange={handleChange}
          className="chat-input-field"
          tabIndex="-1"
          onKeyUp={submitOnEnter}
          autoFocus
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={sendMessage}
            tabIndex="0"
          >
            SEND
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
