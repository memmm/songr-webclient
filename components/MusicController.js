import React from "react";
import "./MusicController.scss";
import cookies from "next-cookies";
import axios from "axios";

export default class MusicController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  componentDidMount = () => {
    this.getCurrentlyPlaying();
  };

  getCurrentlyPlaying(e) {
    axios
      .get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          artist: res.data.item ? res.data.item.artists[0].name : "",
          song: res.data.item ? res.data.item.name : "",
          is_playing: res.data.is_playing,
          ms_left: res.data.item
            ? res.data.item.duration_ms - res.data.progress_ms
            : 1000 * 60 //will refetch when current song ends or 1 minute if nothing is listened
        });
        setTimeout(() => this.getCurrentlyPlaying(), this.state.ms_left);
      });
  }

  togglePlay(e) {
    e.target.classList.toggle("pause");
  }
  render() {
    return (
      <div className="music-controller w-100 d-inline-flex align-items-center">
        <p>
          {this.state.artist}
          {this.state.artist ? " : " : "Silence..."} {this.state.song}
        </p>
        <div className="ml-auto">
          <div className="btn btn-prev">
            <div></div>
          </div>
          <div className="btn btn-play" onClick={e => this.togglePlay(e)}>
            <div></div>
          </div>
          <div
            className="btn btn-next"
            // onClick={e => this.getCurrentlyPlaying(e)}
          >
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
