import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Message from "./Message";

export default class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatPartner: { 
        id: 1,
        username: "Zaphod Beeblebrox",
      },
      message: "Say hi to your new match or skip the conversation with the button above.",
      messages: []
    };
  }

  componentDidMount = () => {
    //localStorage
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  }

  submitOnEnter = e => {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }

  sendMessage = () => {
    if (this.state.message) {
      this.props.chatPartner.messages = this.props.chatPartner.messages.concat(this.state.message);
    }
    this.setState({ message: "" });
  }
  render() {
  return (
    <div className="chat-stream flex-grow-1 p-md-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-end">
      <div className="overflow-auto">
        {this.props.chatPartner.messages.map((x, i) => (
          <Message key={i} message={x}></Message>
        ))}
      </div>
      <InputGroup className="">
        <FormControl
          placeholder="Message"
          aria-label="Message"
          onChange={e => this.handleChange(e)}
          className="chat-input-field"
          tabIndex="-1"
          onKeyUp={e => this.submitOnEnter(e)}
          autoFocus
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={this.sendMessage}
            tabIndex="0"
          >
            SEND
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
  }
}
