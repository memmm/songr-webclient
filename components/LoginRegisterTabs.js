import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import "./LoginRegisterTabs.scss";
import Router from "next/router";
import { spotifyWebApiURL } from "../utils/constants";
import { login } from "../utils/auth";

class LoginRegisterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: ""
      },
      spotify_token: "",
      songr_token: ""
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("_token") > -1) {
      let access_token = url
        .split("_token=")[1]
        .split("&")[0]
        .trim();

      login({ token: access_token });
    }
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };
  loginWithSpotify = event => {
    event.preventDefault();
    document.location = spotifyWebApiURL;
  };

  login(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/signin`, {
        username: this.props.user.username,
        password: this.props.user.password
      })
      .then(res => {
        this.setState({
          songr_token: res.data.token
        });
      });

    Router.push("/chat");
  }
  registerWithSpotify(e) {
    e.preventDefault();
    console.log("reg with spoty");
  }
  register(e) {
    e.preventDefault();
    console.log("reg");
  }

  render() {
    const { access_token } = this.state;
    return (
      <Tabs defaultActiveKey="login">
        <Tab eventKey="login" title="Login">
          <Form className="p-3">
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.user.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={e => this.login(e)}
            >
              Login
            </Button>
            <p className="text-center my-2">OR</p>
            <Button
              variant="primary"
              type="submit"
              className="btn-spotify w-100"
              onClick={e => this.loginWithSpotify(e)}
            >
              {access_token !== ""
                ? "Successful authentication!"
                : "Login with Spotify"}
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
                value={this.state.user.email}
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
                value={this.state.user.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.user.password}
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

export default LoginRegisterTabs;
