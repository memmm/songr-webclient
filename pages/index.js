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
      <Row className="index-row">
        <Col xs={12} md={{ span: 5 }}>
          <h2 className="text-white font-weight-bold">Connect through music</h2>{" "}
          We believe music should be a shared experience. Find people who can
          truly understand your musical taste and have a discussion!
          {/* <Image
            src="/static/freewifi-lordess.jpg"
            alt="SongR welcome - connect through music"
            fluid
          /> */}
        </Col>
        <Col xs={12} md={{ span: 6, offset: 1 }}>
          <LoginRegisterTabs />
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default Home;
