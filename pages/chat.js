import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Chat() {
  return (
    <Layout>
      <Container className="m-auto">
        <Row>
          <Col xs={12} md={4} className="border">
            {[...Array(4)].map((x, i) => (
              <ChatCard key={i}></ChatCard>
            ))}
          </Col>
          <Col xs={12} md={8} className="border">
            Blah Blah
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
