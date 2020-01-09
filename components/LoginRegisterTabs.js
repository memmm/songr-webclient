import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./LoginRegisterTabs.scss";
import { loginUser } from "../store/actions/userActions";
import { connect } from "react-redux";

class LoginRegisterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };


  onClicklogin(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onClickRegister(e) {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
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
                placeholder="Email"
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
          </Form>
        </Tab>

        <Tab eventKey="register" title="Register">
          <Form className="p-3">
            <Form.Group controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
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
              onClick={e => this.onClickRegister(e)}
            >
              Register
            </Button>
          </Form>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(LoginRegisterTabs);
