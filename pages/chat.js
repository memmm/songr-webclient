import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";

export default function Chat() {
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
