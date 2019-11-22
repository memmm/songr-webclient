import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./LoginRegisterTabs.scss";

export default function LoginRegisterTabs() {
  function loginWithSpotify() {}
  function login() {}
  function registerWithSpotify() {}
  function register() {}

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
            onClick={login}
          >
            Login
          </Button>
          <p className="text-center my-2">OR</p>
          <Button
            variant="primary"
            type="submit"
            className="btn-spotify w-100"
            onClick={loginWithSpotify}
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
            onClick={register}
          >
            Register
          </Button>
          <p className="text-center my-2">OR</p>
          <Button
            variant="primary"
            type="submit"
            className="btn-spotify w-100"
            onClick={registerWithSpotify}
          >
            Register With Spotify
          </Button>
        </Form>
      </Tab>
    </Tabs>
  );
}
