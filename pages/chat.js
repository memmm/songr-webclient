import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";
//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { spotifyProfileURL, spotifyPlaylistURL } from "../plugins/constants";
import fetch from "isomorphic-unfetch";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    };
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    axios
      .get(`https://api.spotify.com/v1/me/player`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          item: res.data.item,
          is_playing: res.data.is_playing,
          progress_ms: res.data.progress_ms
        });
      });
  }

  render() {
    const { user, playlist } = this.props;
    console.log("playlist", playlist);
    console.log("user", user);
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
                  <Button>NEW CHAT</Button>
                </div>
              </div>
              <div className="d-flex d-md-block my-2 my-md-0">
                {[...Array(4)].map((x, i) => (
                  <ChatCard key={i}></ChatCard>
                ))}
              </div>
            </Col>
            <Col xs={12} md={8} className="d-flex flex-column">
              <div className="my-3 p-md-3 rounded-top d-flex align-items-center justify-content-between">
                <p>User</p>
                <p>Now listening to</p>
                <Button>Leave chat</Button>
              </div>
              <ChatStream />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="p-3">
              <MusicController />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

Chat.getInitialProps = async function(context) {
  const { access_token } = context.query;
  const res = await fetch(spotifyProfileURL + access_token);
  const user = await res.json();
  const res2 = await fetch(spotifyPlaylistURL + access_token);
  const playlist = await res2.json();
  return {
    user,
    playlist: playlist.items
  };
};
