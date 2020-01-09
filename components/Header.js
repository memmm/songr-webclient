import React from "react";
import Link from "next/link";
import "./Layout.scss";
import nextCookie from "next-cookies";
import Button from "react-bootstrap/Button";
import { logoutUser } from "../store/actions/userActions";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="header">
        <ul>
          <li>
            <Link href={this.props.user.authenticated ? "/chat" : "/"}>
              <a>
                <h1 className="title">SongR</h1>
              </a>
            </Link>
          </li>
          {this.props.user.authenticated && (
            <li className="loggedin-panel">
              <Link href="settings">
                <a className="settings-link mr-3">Settings</a>
              </Link>

              <a onClick={e => this.props.logoutUser()} className="logout-btn">
                Logout
              </a>
            </li>
          )}
        </ul>

        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }
          nav {
            text-align: center;
          }
          ul {
            display: flex;
            justify-content: space-between;
          }
          nav > ul {
            padding: 4px 16px;
          }
          li {
            display: flex;
            padding: 6px 8px;
          }
          a {
            color: #067df7;
            text-decoration: none;
            font-size: 13px;
          }
        `}</style>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
