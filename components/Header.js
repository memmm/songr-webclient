import React from "react";
import Link from "next/link";
import "./Layout.scss";
import { logout } from "../utils/auth";

const Header = () => (
  <nav className="header">
    <ul>
      <li>
        <Link href="/">
          <a>
            <h1 className="title">SongR</h1>
          </a>
        </Link>
      </li>
      <li>
        <Link href="settings">
          <a>Settings</a>
        </Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
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

export default Header;
