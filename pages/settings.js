import React from "react";
import Layout from "../components/Layout";
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
import { getUserData, updateUserInfo } from "../store/actions/userActions";
import { addGenre, addTrack, addArtist, deleteGenre, deleteTrack, deleteArtist } from "../store/actions/preferenceActions";
import cookies from "next-cookies";

export default class Settings extends React.Component {
  constructor(props) {
    //if (!cookie.get("auth_token"))
    //TODO redirect to home if not auth
    super(props);
    this.state = {
      email: '',
      password: '',
      artists: [],
      tracks: [],
      genres: [],
      artistInput: '',
      genreInput: '',
      trackArtistInput: '',
      trackTitleInput: ''
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  getUserProp = (prop) => {
    var user = JSON.parse(localStorage.getItem('auth_user'));
    return user[prop];
  }

  componentDidMount = () => {
    this.setState({password: this.getUserProp('password'), email: this.getUserProp('email')});
    //TODO get user preferences if not stored yet in localStorage
    //return them as props
    const preferences = JSON.parse(localStorage.getItem('preferences'));
    if (preferences){
      preferences.tracks = preferences.tracks.map(x => `${x.artist}: ${x.track}`);
      this.setState({...preferences});
    }
  }

  onClickloginWithSpotify = event => {
    event.preventDefault();
    //Could have: set state param in the redirect URI for security
    document.location = spotifyWebApiURL;
     
  };

  changeSettings = () => {
    updateUserInfo({email, password});
  }

  removeItem(e, category, index) {
    e.preventDefault();
    if (category == 'tracks'){
      this.setState({ tracks: this.state.tracks.filter((_, i) => i !== index)});
    } else if (category == 'artists') {
      this.setState({ artists: this.state.artists.filter((_, i) => i !== index)});
    } else if (category == 'genres') {
      this.setState({ genres: this.state.genres.filter((_, i) => i !== index)});
    }
  }

  addItem = (e, category) => {
    e.preventDefault();
    if (category == 'tracks'){
      this.setState({tracks: [...this.state.tracks, [this.state.trackArtistInput, ": ",  this.state.trackTitleInput]]});
      this.setState({trackArtistInput: ""}); document.getElementsByName("trackArtistInput")[0].value ="";
      this.setState({trackTitleInput: ""}); document.getElementsByName("trackTitleInput")[0].value ="";
    } else if (category == 'artists') {
      this.setState({artists: [...this.state.artists, this.state.artistInput]});
      this.setState({artistInput: ""}); document.getElementsByName("artistInput")[0].value ="";
    } else if (category == 'genres') {
      this.setState({genres: [...this.state.genres, this.state.genreInput]});
      this.setState({genreInput: ""}); document.getElementsByName("genreInput")[0].value ="";
    }
  }
     
  render() {
    return (
      <Layout className="h-100">
        <Container className="settings-container mx-auto mt-md-5 h-100">
          <Row className="settings-row">
            <Col xs={12} md={4} className="section py-3">
              <h4>Account Settings</h4>
              <div>
                <label className="mt-3 mb-1">Password:</label>
                <FormControl
                  type="password"
                  aria-label="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                  aria-describedby="basic-addon2"
                />
                <label className="mt-3 mb-1">Email:</label>
                <FormControl
                  aria-label="email"
                  name="email"
                  onChange={e => this.handleChange(e)}
                  value={this.state.email}
                  aria-describedby="basic-addon2"
                />
                <Button
                  className="mt-3 w-100"
                  variant="outline-secondary"
                  onClick={e => this.changeSettings(e)}
                >
                  Save changes
                </Button>
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
                    <h5 className="mt-2">Songs</h5>
                    <ul className="list-items pl-2">
                      {this.state.tracks.map((item, iTrack) => (
                        <li
                          className="d-flex py-1 justify-content-between w-100 item"
                          key={iTrack}
                        >
                          {item}
                          <a href="" onClick={e => this.removeItem(e, 'tracks', iTrack)}>
                          <i className="fas fa-trash-alt"></i> Remove
                          </a>
                        </li>
                      ))} 
                    </ul>
                    <InputGroup className="mt-auto">
                      <FormControl
                        type="text"
                        placeholder="Artist"
                        name="trackArtistInput"
                        onChange={e => this.handleChange(e)}
                        aria-label="text"
                      />
                      <FormControl
                        className="ml-1"
                        type="text"
                        name="trackTitleInput"
                        onChange={e => this.handleChange(e)}
                        placeholder="Title"
                        aria-label="text"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={e => this.addItem(e, 'tracks')}
                          tabIndex="0"
                        >
                          ADD
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                  
                  <div className="pref-section d-flex flex-column ">
                    <h5 className="mt-2">Genres</h5>
                    <ul className="list-items pl-2">
                      {this.state.genres.map((item, iGenre) => (
                        <li
                          className="d-flex py-1 justify-content-between w-100 item"
                          key={iGenre}
                        >
                          {item}
                          <a href="" onClick={e => this.removeItem(e, 'genres', iGenre)}>
                          <i className="fas fa-trash-alt"></i> Remove
                          </a>
                        </li>
                      ))} 
                    </ul>
                    <InputGroup className="mt-auto">
                      <FormControl
                        type="text"
                        placeholder="Genre"
                        name="genreInput"
                        onChange={e => this.handleChange(e)}
                        aria-label="text"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={e => this.addItem(e, 'genres')}
                          tabIndex="0"
                        >
                          ADD
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                  <div className="pref-section d-flex flex-column ">
                    <h5 className="mt-2">Artists</h5>
                    <ul className="list-items pl-2">
                      {this.state.artists.map((item, iArtist) => (
                        <li
                          className="d-flex py-1 justify-content-between w-100 item"
                          key={iArtist}
                        >
                          {item}
                          <a href="" onClick={e => this.removeItem(e, 'artists', iArtist)}>
                          <i className="fas fa-trash-alt"></i> Remove
                          </a>
                        </li>
                      ))} 
                    </ul>
                    <InputGroup className="mt-auto">
                      <FormControl
                        type="text"
                        placeholder="Artist"
                        name="artistInput"
                        onChange={e => this.handleChange(e)}
                        aria-label="text"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={e => this.addItem(e, 'artists')}
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
