import React from "react";
import Link from "next/link";
import axios from "axios";
import cookie from "js-cookie";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";
import { spotifyProfileURL, songrService } from "../utils/constants";
import { connectSpotifyToUser, refreshSpotifyToken } from "../store/actions/userActions";


//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        { name: "Zaphod Beeblebrox" },
        { name: "Arthur Dent" },
        { name: "Marvin" }
      ],
      currentChatPartner: null,
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
      refreshSpotifyToken();
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
      this.joinSpotifyQueue();
    else this.joinPreferenceQueue();

  }

  joinPreferenceQueue = () => {
    //Mock data, needs to be active user's data
    let c = JSON.parse(cookie.get("auth_user"));
    var url = `${songrService}joinpreferencequeue/${c.email}`;
    //axios.post(url);
  }

  joinSpotifyQueue = () => {
    let c = JSON.parse(cookie.get("auth_user"));
    axios.post(`${songrService}/joinspotifyqueue/${email}`);
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
              <div className="my-3 p-md-3 rounded-top d-flex align-items-center justify-content-between">
              <Image
                src="/static/pusheen.jpg"
                className="partner-thumbnail img-thumbnail rounded-circle mr-3"
              />
                <p className="mb-0">Now listening to Six Foe: <b>Seasons</b></p>
                <Button onClick={e => this.getCurrentlyPlaying(e)}>
                  Leave chat
                </Button>
              </div>
              <ChatStream />
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
