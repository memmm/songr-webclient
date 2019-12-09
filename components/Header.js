import React from "react";
import Link from "next/link";
import "./Layout.scss";
import { logout } from "../utils/auth";
import nextCookie from "next-cookies";
import Button from "react-bootstrap/Button";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <ul>
          <li>
            <Link href={nextCookie(this.context).spotify_token ? "/chat" : "/"}>
              <a>
                <h1 className="title">SongR</h1>
              </a>
            </Link>
          </li>
          {nextCookie(this.context).spotify_token && (
            <li className="loggedin-panel">
              <Link href="settings">
                <a className="settings-link mr-3">Settings</a>
              </Link>

              <a onClick={logout} className="logout-btn">
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
