import React from "react";
import Link from "next/link";
import axios from "axios";
import cookie from "js-cookie";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";
import { connectSpotifyToUser, refreshSpotifyToken, logoutUser } from "../store/actions/userActions";
import { getPreferenceMatch, getSpotifyMatch } from "../store/actions/dataActions";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class Chat extends React.Component {
  constructor(props) {
    //if (!cookie.get("auth_token"))
    //TODO redirect to home if not auth
    super(props);
    this.state = {
      matches: [
        // { name: "Zaphod Beeblebrox", messages: ["hello", "nah"]},
        // { name: "Arthur Dent", messages: ["hogy bassza oket telibe", "ezeket a jo elet"] },
        // { name: "Marvin", messages: [] }
      ],
      currentChatPartner: { name: "", messages: []},
      selectedQueue: "spotify"
    };
  }



  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("code") > -1 && !cookie.get("spotify_token")) {
      let spotify_code = url
        .split("code=")[1]
        .split("&")[0]
        .trim();
      connectSpotifyToUser(spotify_code); 
    }
    if (cookie.get("spotify_refresh_token") && !cookie.get("spotify_token")) {
      //TODO fix refresh token request
      //refreshSpotifyToken();
    }

    let chats = localStorage.getItem('chats');
    if (chats) {
      this.setState({matches: JSON.parse(chats)});
    }
    
  };
  
  handleOptionChange = changeEvent => {
    this.setState({
      selectedQueue: changeEvent.target.value
    });
  };

  //Join Queue
  newChat = e => {
    e.preventDefault();
    if (this.state.selectedQueue === "spotify")
      getSpotifyMatch();
    else getPreferenceMatch();
    //TODO: set gotten match in localStore and/or state
    localStorage.setItem('chats', JSON.stringify(this.state.matches))
  }



  leaveChat() {
    //TODO: empty current chat window, delete user from list
  }

  render() {
    return (
      <Layout>
        <div className="chat-container flex-grow-1 flex-md-grow-0 m-md-auto d-flex flex-column">
          <div className="d-flex flex-column flex-md-row flex-grow-1">
            <div className="mx-3 flex-md-grow-0">
              <Form onSubmit={this.newChat} className="py-1 py-md-3 border-bottom border-info d-flex align-items-center justify-content-between">
                <div className="">
                  <p className="d-block mb-1 font-weight-bold">Based on:</p>
                  <div>
                    <input type="radio"
                                value="preferences" 
                                name="queue-option"
                                checked={this.state.selectedQueue === "preferences"}
                                onChange={e => this.handleOptionChange(e)}/> Preferences
                  </div>
                  <div>
                    <input type="radio" 
                                value="spotify" 
                                name="queue-option"
                                checked={this.state.selectedQueue === "spotify"}
                                onChange={e => this.handleOptionChange(e)}/> Spotify
                  </div>
                </div>
                <div>
                  <Button type="submit">NEW CHAT</Button>
                </div>
              </Form>
              <div className="d-flex d-md-block my-2 my-md-0">
                {this.state.matches.map((x, i) => (
                  <ChatCard
                    key={i}
                    match={x}
                    onClick={() => this.setState({ currentChatPartner: x })}
                  ></ChatCard>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column flex-md-grow-1 ml-auto mr-4">
              <div className="my-3 p-md-3 rounded-top d-flex align-items-center">
                <Image
                  src="/static/pusheen.jpg"
                  className="partner-thumbnail img-thumbnail rounded-circle mr-3"
                />
                <span className="font-weight-bold">{this.state.currentChatPartner.name} &nbsp;</span>
                <p className="mb-0"> now listening to Six Foe: <b>Seasons</b></p>
                <Button className="ml-auto" onClick={e => this.getCurrentlyPlaying(e)}>
                  Leave chat
                </Button>
              </div>
              <ChatStream chatPartner= {this.state.currentChatPartner} />
            </div>
          </div>
          <div className="m-4">
              <MusicController />
          </div>
        </div>
      </Layout>
    );
  }
  
}

export default connect()(Chat);
