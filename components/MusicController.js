import React from "react";
import "./MusicController.scss";
import cookies from "next-cookies";
import axios from "axios";
import cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import { spotifyWebApiURL, spotifyPause } from "../utils/constants";

export default class MusicController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.timeoutFetchCurrent = null;
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  componentDidMount = () => {
    if (cookie.get('spotify_token'))
      this.getCurrentlyPlaying();
  };

  getCurrentlyPlaying(e) {
    axios
      .get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: {
          Authorization: "Bearer " + cookie.get('spotify_token')
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
        this.timeoutFetchCurrent = setTimeout(
          () => this.getCurrentlyPlaying(),
          this.state.ms_left
        );
      });
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutFetchCurrent);
  };

  togglePlay(e) {
    e.target.classList.toggle("pause");
    axios.put(spotifyPause, {"Authorization": `Bearer ${cookie.get('spotify_token')}`});
  }

  onClickloginWithSpotify = event => {
    event.preventDefault();
    //Could have: set state param in the redirect URI for security
    document.location = spotifyWebApiURL;
     
  };

  //TODO: if there is no spoty token, show 'Connect to Spotify' button
  render() {
    return (
      <div className="music-controller w-100 d-inline-flex align-items-center">
        {!(cookie.get('spotify_token')) ? (
        <Button
                  className="mt-3 w-25 "
                  variant="secondary"
                  onClick={e => this.onClickloginWithSpotify(e)}
                >
                  Connect your Spotify
                </Button>
        ) : (
        <p className="mb-0 w-50 overflow-hidden">
          {this.state.artist}
          {this.state.artist ? ": " : "Silence..."} <b>{this.state.song}</b>
        </p>)
  }
        <div className="ml-auto d-flex flex-nowrap align-items-center">
          <div className="button btn-prev">
            <div></div>
          </div>
          <div className="button btn-play" onClick={e => this.togglePlay(e)}>
            <div></div>
          </div>
          <div
            className="button btn-next"
            // onClick={e => this.getCurrentlyPlaying(e)}
          >
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
