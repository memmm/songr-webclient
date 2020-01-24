import React from "react";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  getUserProp = (prop) => {
    var user = JSON.parse(localStorage.getItem('auth_user'));
    return user[prop];
  }
  componentDidMount() {
    if (this.props.message[1] == this.getUserProp("id")){
      const node = this.myRef.current.classList.add('own');
      //document.getElementsByClassName("message-bubble")[0].classList.add('own');
    }
  }
  render() {
    return (
      <div ref={this.myRef} className="message-bubble rounded p-2 my-3">
        {this.props.message[0]}
      </div>
    )}
  
}
