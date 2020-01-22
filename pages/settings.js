import React from "react";
import Layout from "../components/Layout";
import ListItems from "../components/ListItems";
import ImageUpload from "../components/ImageUpload";
import { spotifyWebApiURL } from "../utils/constants";
import cookie from "js-cookie";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getUserData } from "../store/actions/userActions";
import { addGenre, addSong, addArtist, deleteGenre, deleteSong, deleteArtist } from "../store/actions/preferenceActions";
import cookies from "next-cookies";

export default class Settings extends React.Component {
  constructor(props) {
    //if (!cookie.get("auth_token"))
    //TODO redirect to home if not auth
    super(props);
    this.state = {
      preferences: {
        artists: [],
        tracks: [],
        genres: []
      }
    };
  }

  componentDidMount = () => {
    
    //TODO get user preferences if not stored yet in localStorage
    //return them as props
    const preferences = JSON.parse(localStorage.getItem('preferences'));
    if (preferences){
      preferences.tracks = preferences.tracks.map(x => `${x.artist}: ${x.track}`);
      this.setState({preferences: preferences});
    }
  }

  onClickloginWithSpotify = event => {
    event.preventDefault();
    //Could have: set state param in the redirect URI for security
    document.location = spotifyWebApiURL;
     
  };

  changeSettings() {}
  addSong() {}
  addGenre() {}
  addArtist(e) {
    e.preventDefault();
  }
     
  render() {
    return (
      <Layout className="h-100">
        <Container className="settings-container mx-auto mt-md-5 h-100">
          <Row className="settings-row">
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
                <div className="mt-3">
                  <label className="">Thumbnail:</label>
                  <ImageUpload/>
                </div>
              </div>
              <div className="mt-5">
              {cookie.get("spotify_refresh_token") ? (
                <label className="mb-0">Connected to Spotify</label>
              ) : (
                <div>
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
              )}
              </div>
            </Col>
            <Col xs={12} md={{ span: 8, offset: 0 }} className="px-0 px-md-2">
              <div className="section d-flex flex-column p-3 h-100">
                <h4 className="mb-3">Preferences</h4>
                <div className="d-flex flex-column h-100">
                  <div className="pref-section d-flex flex-column">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Songs</h5>
                    </div>

                    <ListItems items={this.state.preferences.tracks}></ListItems>
                    <InputGroup className="mt-auto">
                      <FormControl
                        type="text"
                        placeholder="Artist"
                        aria-label="text"
                      />
                      <FormControl
                        className="ml-1"
                        type="text"
                        placeholder="Title"
                        aria-label="text"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={addSong}
                          tabIndex="0"
                        >
                          ADD
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                  <div className="pref-section d-flex flex-column ">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Genres</h5>
                    </div>
                    <ListItems items={this.state.preferences.genres}></ListItems>
                    <InputGroup className="mt-auto">
                      <FormControl
                        type="text"
                        placeholder="Genre"
                        aria-label="text"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={addGenre}
                          tabIndex="0"
                        >
                          ADD
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                  <div className="pref-section d-flex flex-column ">
                    <div className="d-flex justify-content-between my-2">
                      <h5>Artists</h5>
                    </div>

                    <ListItems items={this.state.preferences.artists}></ListItems>
                    <InputGroup className="mt-auto">
                      <FormControl
                        type="text"
                        placeholder="Artist"
                        aria-label="text"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={addArtist}
                          tabIndex="0"
                        >
                          ADD
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
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
