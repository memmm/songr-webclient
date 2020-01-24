import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Message from "./Message";
import { songrService } from "../utils/constants";
import cookie from "js-cookie";

export default class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      userId: ''
    };
  }

  componentDidMount = () => {
    var userId = JSON.parse(localStorage.getItem('auth_user')).userId;
   // setState({userId: userId});
    
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  }

  submitOnEnter = e => {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }

  getUserProp = (prop) => {
    var user = JSON.parse(localStorage.getItem('auth_user'));
    return user[prop];
  }

  sendMessage = () => {
    let token = cookie.get("auth_token");
    if (this.state.message) {
      this.props.chatPartner.messages.push([this.state.message, this.getUserProp('id')]);
    }
    axios.post(`${songrService}chat/${token}/send-message`, null, { 
      headers: {'Content-Type': 'application/json'}, 
      params: { senderId: this.getUserProp('id'), receiverId: this.props.chatPartner.userId, message: this.state.message } });
    this.setState({ message: "" });
    document.getElementsByClassName("chat-input-field").value ="";
  }
  render() {
  return (
    <div className="chat-stream flex-grow-1 flex-grow-1 rounded-bottom d-flex flex-column justify-content-end p-md-3 mt-2 ">
      {this.props.chatPartner.name == "" && 
        <span className="m-auto">Start a new conversation or choose one on the right side.</span>}
      {(this.props.chatPartner.name != "" && this.props.chatPartner.messages.length == 0) &&
        <span className="m-auto">Say hi to your new match or skip the conversation with the button above.</span>}
      <div className="overflow-auto">
        {this.props.chatPartner.messages.map((x, i) => (
          <Message key={i} message={x} className="`${x.userId}`"></Message>
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
