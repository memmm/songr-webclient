import React from "react";
import Button from "react-bootstrap/Button";
import "./MusicController.scss";

export default function MusicController() {
  function togglePlay(e) {
    e.target.classList.toggle("pause");
  }
  return (
    <div className="music-controller">
      <div className="btn btn-prev"></div>
      <div className="btn btn-play" onClick={togglePlay}>
        <div className="play"></div>
      </div>
      <div className="btn btn-next"></div>
    </div>
  );
}
