import React from "react";
import "./MusicController.scss";
import cookies from "next-cookies";
import axios from "axios";
import cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import { spotifyWebApiURL, spotifyPlayer } from "../utils/constants";
import { refreshSpotifyToken} from "../store/actions/userActions";

var isConnected = false;

export default class MusicController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    isConnected = cookie.get('spotify_token');
    this.timeoutFetchCurrent = null;
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  componentDidMount = () => {
    if (isConnected)
      this.getCurrentlyPlaying();
  };

  getCurrentlyPlaying() {
    clearTimeout(this.timeoutFetchCurrent);
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
            ? ((res.data.item.duration_ms - res.data.progress_ms) > 1000 * 30 ? 1000 * 30 : (res.data.item.duration_ms - res.data.progress_ms - 3))
            : 1000 * 60 //will refetch when current song ends or 1 minute if nothing is listened
        });
        this.timeoutFetchCurrent = setTimeout(
          () => this.getCurrentlyPlaying(),
          this.state.ms_left
        );
        if(res.data.is_playing) document.getElementsByClassName("btn-play")[0].classList.toggle("pause");
      })
      .catch(err => {
        if(err.status == 401){
          refreshSpotifyToken();
        }
      });
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutFetchCurrent);
  };

  togglePlay(e) {
    e.preventDefault();
    var btnClassList = document.getElementsByClassName("btn-play")[0].classList;
    if (btnClassList.contains("pause")) {
      axios.put(spotifyPlayer + "pause", {}, {
        headers: {
          Authorization: "Bearer " + cookie.get('spotify_token')
        }
      }).then(res => {
        btnClassList.toggle("pause");
      });
    } else {
      axios.put(spotifyPlayer + "play", {}, {
        headers: {
          Authorization: "Bearer " + cookie.get('spotify_token')
        }
      }).then(res => {
        btnClassList.toggle("pause");
      });
    }
  }

  getSong(e, direction) {
    e.preventDefault();
    if (cookie.get('spotify_token')){
      axios.post(spotifyPlayer + direction, {}, {
        headers: {
          Authorization: "Bearer " + cookie.get('spotify_token')
        }
      });
    } else {
      //TODO animate connect button
      console.log("Connect to Spotify to use these buttons!");
    }
  }

  onClickloginWithSpotify = event => {
    event.preventDefault();
    //Could have: set state param in the redirect URI for security
    document.location = spotifyWebApiURL;
     
  };

  render() {
    return (
      <div className="music-controller w-100 d-inline-flex align-items-center">
        {(!isConnected) ? (
        <Button
                  className="connect-btn mt-3 w-25 "
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
          <div className="button btn-prev" onClick={e => this.getSong(e, "previous")}>
            <div></div>
          </div>
          <div className="button btn-play" onClick={e => this.togglePlay(e)}>
            <div></div>
          </div>
          <div
            className="button btn-next" onClick={e => this.getSong(e, "next")}
          >
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
