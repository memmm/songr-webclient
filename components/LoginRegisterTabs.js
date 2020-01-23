import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Router from "next/router";
import cookie from "js-cookie";

import "./LoginRegisterTabs.scss";
import { loginUser, signupUser } from "../store/actions/userActions";
import { connect } from "react-redux";

class LoginRegisterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      message: "",
      validated: false
    };
  }

  componentDidMount = () => {
    if(cookie.get("auth_token")) {
      Router.push("/chat");
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };


  onClicklogin = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ validated: true});
    } else {
      const userData = {
        userName: this.state.username,
        password: this.state.password
      };
      loginUser(userData);
      setTimeout(this.setState({ message: "The authentication was unsuccessful."}), 5000);
    }
  }

  onClickRegister = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ validated: true});
    } else {
      const userData = {
        userName: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      if (!signupUser(userData)) {
        this.setState({ message: "Something went wrong, please try again!" });
      }
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey="login">
        <Tab eventKey="login" title="Login">
          <Form  noValidate validated={this.state.validated} onSubmit={this.onClicklogin} className="p-3">
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={this.state.username}
                name="username"
                onChange={e => this.handleChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={e => this.handleChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100"
            >
              Login
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="register" title="Register">
          <Form  noValidate validated={this.state.validated} onSubmit={this.onClickRegister} className="p-3">
            <Form.Group controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formSignupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAcceptCheckbox">
              <Form.Check required type="checkbox" label="I accept everything." />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100"
            >
              Register
            </Button>
              <Form.Label>{this.state.message}</Form.Label>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}



export default LoginRegisterTabs;
