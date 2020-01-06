import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class about extends React.Component {
  render() {
    return (
      <Layout>
        <Container className="about-section section mt-md-5 p-4 p-md-5">
          <h1>What is this?</h1>
          <p>
            SongR is a site where you can meet new people who like the same
            music as you do. When you register, we ask you to fill out our form
            about your preferences in music. This is the base for us to create
            new connections throughout the world. You will be paired with
            someone who likes similar music, and you can start chatting. You
            always have the option to skip or leave a conversation.
          </p>
          <h4>It's even easier with Spotify</h4>
          Connect your profile with your Spotify account, and we fetch your
          currently listened song; maybe you are not alone! You can also make
          your current song visible to others. For your convinience, there is a
          control panel for your Spotify playlist.
          <h4>Want more control? Go for Premium!</h4>
          You decide who to talk to: filter for distance, gender, age and more.
          Keep your conversations for the eternity.
          <h1 className="mt-5 mb-3">Why Premium?</h1>
          <Row>
            <Col>
            <div className="subscription-card">
              <h4>Basic</h4>
              <ul>
                <li>Skip max. 5 conversations per hour</li>
                <li>No control over matches</li>
                <li>
                  Your conversations are lost after leaving the site or
                  refreshing
                </li>
              </ul>
              <div className="text-right">
              <span>Free</span></div>
              </div>
            </Col>
            <Col>
            <div className="subscription-card premium">
              <h4>Premium</h4>
              <ul>
                <li>Unlimited conversation skipping</li>
                <li>Filter possible matches</li>
                <li>Your conversations are stored</li>
              </ul>
              <div className="text-right">
              <span>€9.99 / month</span></div>
              <Button variant="success" className="w-100 mt-3">Upgrade Now</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
