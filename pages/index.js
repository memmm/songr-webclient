import React from "react";
//Own components
import Layout from "../components/Layout";
import LoginRegisterTabs from "../components/LoginRegisterTabs";
//Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Home = () => (
  <Layout>
    <Container className="m-auto">
      <Row>
        <Col xs={12} md={6}>
          <Image
            src="/static/window.jpg"
            alt="SongR welcome - connect through music"
            fluid
          />
        </Col>
        <Col xs={12} md={6}>
          <LoginRegisterTabs />
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default Home;
