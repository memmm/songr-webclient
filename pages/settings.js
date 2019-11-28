import React from "react";
import Layout from "../components/Layout";
import ListItem from "../components/ListItem";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

export default class Settings extends React.Component {
  static getInitialProps({ req, res }) {
    return { songs: ["first", "second"] };
  }

  constructor(props) {
    super(props);
    // this.state = { loggedIn: false }
  }

  changeSettings() {}
  addSong() {}
  addGenre() {}
  addArtist() {}
  render() {
    return (
      <Layout>
        <Container className="settings-container mx-auto mt-md-5">
          <Row>
            <Col xs={12} md={4} className="section py-3">
              <div className="d-flex justify-content-between">
                <h4>Account Settings</h4>
                <a href="" onClick={this.changeSettings()}>
                  Edit
                </a>
              </div>
              <div>
                <label className="mb-1">Username:</label>
                <FormControl
                  aria-label="username"
                  aria-describedby="basic-addon2"
                />
                <label className="mt-3 mb-1">Password:</label>
                <FormControl
                  type="password"
                  aria-label="password"
                  aria-describedby="basic-addon2"
                />
                <label className="mt-3 mb-1">Email:</label>
                <FormControl
                  aria-label="email"
                  aria-describedby="basic-addon2"
                />
                <div className="d-flex justify-content-between align-items-start mt-3">
                  <label className="">Thumbnail:</label>
                  <Image
                    className="thumbnail p-0"
                    src="static/pusheen.jpg"
                    thumbnail
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-0">Not connected to Spotify</label>
                <Form.Text className="text-muted">
                  Connect now to enjoy everything Songr has to offer!
                </Form.Text>
                <Button className="mt-3 w-100" variant="outline-secondary">
                  Connect
                </Button>
              </div>
            </Col>
            <Col xs={12} md={{ span: 8, offset: 0 }} className="px-0 px-md-2">
              <div className="section d-flex flex-column p-3 h-100">
                <h4 className="mb-3">Preferences</h4>
                <div className="d-flex flex-column h-100">
                  <div className="pref-section">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Songs</h5>
                      <a href="" onClick={this.addSong()}>
                        Add
                      </a>
                    </div>

                    <ul className="pl-2">
                      {this.props.songs.map((song, i) => (
                        <ListItem key={i} item={song}></ListItem>
                      ))}
                    </ul>
                  </div>
                  <div className="pref-section">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Genres</h5>
                      <a href="" onClick={this.addGenre()}>
                        Add
                      </a>
                    </div>

                    <ul className="pl-2">
                      {this.props.songs.map((song, i) => (
                        <ListItem key={i} item={song}></ListItem>
                      ))}
                    </ul>
                  </div>
                  <div className="pref-section">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Artists</h5>
                      <a href="" onClick={this.addGenre()}>
                        Add
                      </a>
                    </div>

                    <ul className="pl-2">
                      {this.props.songs.map((song, i) => (
                        <ListItem key={i} item={song}></ListItem>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
