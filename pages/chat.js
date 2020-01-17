import React from "react";
import Link from "next/link";
import axios from "axios";
import nextCookie from "next-cookies";
import fetch from "isomorphic-unfetch";
import qs from 'qs';

import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";
import { spotifyProfileURL, spotifyTokenURL } from "../utils/constants";
import { loginUser } from "../store/actions/userActions";
import { connect } from "react-redux";

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
      currentChatPartner: null
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("code") > -1) {
      let spotify_code = url
        .split("code=")[1]
        .split("&")[0]
        .trim();
  
      console.log(spotify_code);
      const data = { 'bar': 123 };
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };
      axios(spotifyTokenURL);
    }
  };
  

  render() {
    const { user, spotify_token } = this.props;
    return (
      <Layout>
        <Container className="chat-container flex-grow-1 flex-md-grow-0 m-md-auto">
          <Row>
            <Col xs={12} md={4}>
              <div className="py-3 border-bottom border-info d-flex align-items-center justify-content-between">
                <div>
                  Based on:
                  <Form>
                    <Form.Check type="radio" label={`Preferences`} />
                    <Form.Check type="radio" label={`Spotify`} />
                  </Form>
                </div>
                <div>
                  <Button onClick={this.newChat()}>NEW CHAT</Button>
                </div>
              </div>
              <div className="d-flex d-md-block my-2 my-md-0">
                {this.state.matches.map((x, i) => (
                  <ChatCard
                    key={i}
                    match={x}
                    onClick={() => this.setState({ currentChatPartner: x })}
                  ></ChatCard>
                ))}
              </div>
            </Col>
            <Col xs={12} md={8} className="d-flex flex-column">
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
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="p-3">
              <MusicController token={spotify_token} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  //Event handling:

  //Join Queue
  newChat() {
    //To-do: Differentiate between radiobuttons
    this.joinPreferenceQueue();
  }
  //Join Preference Queue
  joinPreferenceQueue() {
    //Mock data, needs to be active user's data
    var userId = "1";
    var userName = "Temp";
    var token = "x";

    var url = "localhost:9090/joinpreferencequeue/" + userId + "/" + userName; // +"/"+token;
    axios.post(url);
  }

  //Join Spotify Queue
  joinSpotifyQueue() {
    axios.post("localhost:9090/joinspotifyqueue");
  }

  //Leave Chat
  leaveChat() {}
}



Chat.getInitialProps = async function(context) {
  const { spotify_token } = nextCookie(context);
  if (spotify_token != undefined){
    const res = await fetch(spotifyProfileURL + spotify_token);
    const user = await res.json();
    return {
      spotify_token,
      user
    };
  }
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect()(Chat);
