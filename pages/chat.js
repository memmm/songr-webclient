import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";
import nextCookie from "next-cookies";
//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import {
  spotifyProfileURL,
  spotifyCurrentlyPlayingURL
} from "../utils/constants";
import fetch from "isomorphic-unfetch";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    };
  }

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
}

Chat.getInitialProps = async function(context) {
  const { spotify_token } = nextCookie(context);
  const res = await fetch(spotifyProfileURL + spotify_token);
  const user = await res.json();
  return {
    spotify_token,
    user
  };
};
