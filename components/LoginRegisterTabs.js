import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import "./LoginRegisterTabs.scss";
import Router from "next/router";
import { spotifyWebApiURL } from "../utils/constants";
import { login, loginWithSpotify } from "../utils/auth";
import { addUser, actions } from "../store/userSlice";
import { connect } from "react-redux";

class LoginRegisterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("_token") > -1) {
      let spotify_token = url
        .split("_token=")[1]
        .split("&")[0]
        .trim();

      loginWithSpotify({ token: spotify_token });
    }
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  onClickloginWithSpotify = event => {
    event.preventDefault();
    document.location = spotifyWebApiURL;
  };

  onClicklogin(e) {
    e.preventDefault();
    login({ username: this.state.username, password: this.state.password });
  }

  registerWithSpotify(e) {
    e.preventDefault();
    this.props.dispatch(
      actions.addUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    );
    document.location = spotifyWebApiURL;
  }

  register(e) {
    e.preventDefault();
    document.location = spotifyWebApiURL;
  }

  render() {
    return (
      <Tabs defaultActiveKey="login">
        <Tab eventKey="login" title="Login">
          <Form className="p-3">
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                name="email"
                onChange={e => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={e => this.handleChange(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={e => this.onClicklogin(e)}
            >
              Login
            </Button>
            <p className="text-center my-2">OR</p>
            <Button
              variant="primary"
              type="submit"
              className="btn-spotify w-100"
              onClick={e => this.onClickloginWithSpotify(e)}
            >
              Login with Spotify
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="register" title="Register">
          <Form className="p-3">
            <Form.Group controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formSignupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAcceptCheckbox">
              <Form.Check type="checkbox" label="I accept everything." />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={e => this.register(e)}
            >
              Register
            </Button>
            <p className="text-center my-2">OR</p>
            <Button
              variant="primary"
              type="submit"
              className="btn-spotify w-100"
              onClick={e => this.registerWithSpotify(e)}
            >
              Register With Spotify
            </Button>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}

export default connect()(LoginRegisterTabs);
