import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import "./LoginRegisterTabs.scss";
import Router from "next/router";

class LoginRegisterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    };
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
  };
  loginWithSpotify = event => {
    event.preventDefault();

    const user = {
      name: this.state.person
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  login(e) {
    e.preventDefault();
    console.log("login");

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
    return (
      <Tabs defaultActiveKey="login">
        <Tab eventKey="login" title="Login">
          <Form className="p-3">
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
              Login With Spotify
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form className="p-3">
            <Form.Group controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formSignupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
