import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export default function Chat() {
  return (
    <Layout>
      <Container className="chat-container m-auto">
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
            <div>
              {[...Array(4)].map((x, i) => (
                <ChatCard key={i}></ChatCard>
              ))}
            </div>
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column">
            <div className="chat-stream mx-3 mt-3 p-3 rounded-top d-flex align-items-center justify-content-between">
              <p>User</p>
              <p>Now listening to</p>
              <Button>Leave chat</Button>
            </div>
            <div className="chat-stream mx-3 p-3 flex-grow-1 rounded-bottom d-flex flex-column justify-content-between">
              Chat bubbles here
              <InputGroup className="">
                <FormControl placeholder="Message" aria-label="Message" />
                <InputGroup.Append>
                  <Button variant="outline-secondary">SEND</Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="">
            Music controller here
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
