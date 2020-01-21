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
      message: "",
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
    console.log(document.getElementsByClassName("chat-input-field"));
    document.getElementsByClassName("chat-input-field").value ="";
  }
  render() {
  return (
    <div className="chat-stream flex-grow-1 p-md-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-end">
      {this.props.chatPartner.name == "" && 
        <span className="m-auto">Start a new conversation or choose one on the right side.</span>}
      {(this.props.chatPartner.name != "" && this.props.chatPartner.messages.length == 0) &&
        <span className="m-auto">Say hi to your new match or skip the conversation with the button above.</span>}
      <div className="overflow-auto">
        {this.props.chatPartner.messages.map((x, i) => (
          <Message key={i} message={x}></Message>
        ))}
      </div>
      {this.props.chatPartner.name != "" && <InputGroup className="">
        <FormControl
          placeholder="Message"
          aria-label="Message"
          onChange={e => this.handleChange(e)}
          value={this.state.message}
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
      </InputGroup>}
    </div>
  );
  }
}
