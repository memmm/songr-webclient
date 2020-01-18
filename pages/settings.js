import React from "react";
import Layout from "../components/Layout";
import ListItems from "../components/ListItems";
import axios from "axios";
import { spotifyWebApiURL } from "../utils/constants";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

export default class Settings extends React.Component {
  static async getInitialProps({ req, res }) {
    let artists;
    await axios
      .post(`https://jsonplaceholder.typicode.com/users`, {
        name: "Vajak"
      })
      .then(res => {
        artists = res.data;
        console.log(res.data);
      });
    return { songs: ["first", "second"], artists };
  }

  constructor(props) {
    super(props);
    this.state = {
      artists: []
    };
    // this.state = { loggedIn: false }
  }

  changeSettings() {}
  addSong() {}
  addGenre() {}
  addArtist(e) {
    e.preventDefault();
  }
  onClickloginWithSpotify = event => {
    event.preventDefault();
    //Could have: set state param in the redirect URI for security
    document.location = spotifyWebApiURL;
     
  };
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
                <Button
                  className="mt-3 w-100"
                  variant="outline-secondary"
                  onClick={e => this.onClickloginWithSpotify(e)}
                >
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

                    <ListItems items={this.props.songs}></ListItems>
                  </div>
                  <div className="pref-section">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Genres</h5>
                      <a href="" onClick={this.addGenre()}>
                        Add
                      </a>
                    </div>
                    <ListItems items={this.props.songs}></ListItems>
                  </div>
                  <div className="pref-section">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Artists</h5>
                      <a href="" onClick={e => this.addArtist(e)}>
                        Add
                      </a>
                    </div>

                    <ListItems items={this.state.artists}></ListItems>
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
