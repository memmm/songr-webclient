import React from "react";
import Button from "react-bootstrap/Button";
import "./MusicController.scss";

export default function MusicController() {
  function togglePlay(e) {
    e.target.classList.toggle("pause");
  }
  return (
    <div className="music-controller w-100 d-inline-flex align-items-center">
      <div className="ml-auto">
        <div className="btn btn-prev">
          <div></div>
        </div>
        <div className="btn btn-play" onClick={togglePlay}>
          <div></div>
        </div>
        <div className="btn btn-next">
          <div></div>
        </div>
      </div>
    </div>
  );
}
