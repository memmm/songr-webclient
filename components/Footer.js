import React, { Component } from "react";
import Link from "next/link";

export default class Footer extends Component {
  render() {
    return (
      <div className="w-100 d-flex justify-content-end p-3">
        <Link href="/disclaimer">
          <a>
            <p className="mr-3 mb-0 text-white">Disclaimer</p>
          </a>
        </Link>
        <Link href="/privacy">
          <a>
            <p className="mb-0 text-white">Privacy Policy</p>
          </a>
        </Link>
      </div>
    );
  }
}
