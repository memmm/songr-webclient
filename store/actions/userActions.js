import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "../types";
import { spotifyTokenURL, redirectURI, clientID, clientSecret } from "../../utils/constants";
import Router from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import qs from 'qs';

export const loginUser = userData => {
  // axios
  //   .post(`/signin`, userData)
  //   .then(res => {
  //     // const SongrToken = `Bearer ${res.data.token}`;
  //     cookie.set("auth_token", SongrToken, { expires: 1 });
  //     axios.defaults.headers.common["Authorization"] = SongrToken;
  //     Router.push("/chat");
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
  //This dispatch is only for test:
  const SongrToken = `Bearer TEST`; 
  cookie.set("auth_token", SongrToken, { expires: 1 });
  cookie.set("auth_user", {email: userData.email}, { expires: 1 });
  Router.push("/chat");
};

export const connectSpotifyToUser = spotify_code => {
      let data = { 
        "grant_type": "authorization_code",
        "code": spotify_code,
        "redirect_uri": redirectURI,
        "client_id": clientID,
        "client_secret": clientSecret };
    
        const headers = { 'content-type': 'application/x-www-form-urlencoded' };
        data = qs.stringify(data);
        
      let inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
      axios.post(spotifyTokenURL, data, headers)
        .then((res) => {
          console.log(res);
          cookie.set("spotify_token", res.data.access_token, { expires: inOneHour })
          cookie.set("spotify_refresh_token", res.data.refresh_token, { expires: 365 })
          setTimeout(function() {
            refreshSpotifyToken();
          }, inOneHour)
        })
        .catch(err => console.error(err));
}

export const refreshSpotifyToken = () => {

    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    let data = qs.stringify({ "grant_type": "refresh_token",  "refresh_token": cookie.get("spotify_refresh_token")  });
    let inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
    axios.post(spotifyTokenURL, data, headers)
        .then((res) => {
          console.log(res);
          cookie.set("spotify_token", res.data.access_token, { expires: inOneHour })
        })
        .catch(err => console.error(err));
}

export const signupUser = (newUserData, history) => {
  let isSuccess;
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      Router.push("/settings");
      isSuccess = true;
    })
    .catch((err) => {
      console.error(err);
      isSuccess = false;
    });
    return isSuccess;
};

export const logoutUser = () => {
  cookie.remove("spotify_token");
  cookie.remove("auth_token");
  cookie.remove("auth_user");
  // to support logging out from all windows
  cookie.set("logout", Date.now());
  delete axios.defaults.headers.common['Authorization'];
  Router.push("/");
};

export const getUserData = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
      cookie.set("auth_user", res.data);
    })
    .catch(err => console.log(err));
};


export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};