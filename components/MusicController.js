import React from "react";
import "./MusicController.scss";
import cookies from "next-cookies";
import axios from "axios";
import cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import { spotifyWebApiURL, spotifyPlayer } from "../utils/constants";

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
      .get(`${spotifyPlayer}currently-playing`, {
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
            ? res.data.item.duration_ms - res.data.progress_ms + 1
            : 1000 * 60 //will refetch when current song ends or 1 minute if nothing is listened
        });
        this.timeoutFetchCurrent = setTimeout(
          () => this.getCurrentlyPlaying(),
          this.state.ms_left
        );
        document.getElementsByClassName("btn-play")[0].classList.toggle("pause");
      });
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutFetchCurrent);
  };

  togglePlay(e) {
    document.getElementsByClassName("btn-play")[0].classList.toggle("pause");
    if (!document.getElementsByClassName("btn-play")[0].classList.contains("pause")) {
      axios.put(spotifyPlayer + "pause", {}, {
        headers: {
          Authorization: "Bearer " + cookie.get('spotify_token')
        }
      });
    } else {
      axios.put(spotifyPlayer + "play", {}, {
        headers: {
          Authorization: "Bearer " + cookie.get('spotify_token')
        }
      });
    }
  }

  getNextSong(e) {
    e.preventDefault();
    axios.post(spotifyPlayer + "next", {}, {
      headers: {
        Authorization: "Bearer " + cookie.get('spotify_token')
      }
    });
  }

  getPreviousSong(e){
    e.preventDefault();
    axios.post(spotifyPlayer + "previous", {}, {
      headers: {
        Authorization: "Bearer " + cookie.get('spotify_token')
      }
    });
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
          <div className="button btn-prev" onClick={e => this.getPreviousSong(e)}>
            <div></div>
          </div>
          <div className="button btn-play" onClick={e => this.togglePlay(e)}>
            <div></div>
          </div>
          <div
            className="button btn-next" onClick={e => this.getNextSong(e)}
          >
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
