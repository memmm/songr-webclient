import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "../types";
import { spotifyTokenURL, redirectURI, clientID, clientSecret, songrService } from "../../utils/constants";
import Router from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import qs from 'qs';

export const loginUser = userData => {
  axios
    .post(`${songrService}auth/signin`, null, {params: userData})
    .then(res => {
      //const SongrToken = `Bearer ${res.data}`;
      const SongrToken = `Bearer TEST`;
      cookie.set("auth_token", SongrToken, { expires: 1 });
      cookie.set("auth_user", {username: userData.username}, { expires: 1 });
      if (cookie.get("spotify_refresh_token")) {
        refreshSpotifyToken();
      }
      axios.defaults.headers.common["Authorization"] = SongrToken;
      Router.push("/chat");
    })
    .catch(err => {
      console.log(err.response.data);
    });
  //This is only for test if there is no backend:
  // const SongrToken = `Bearer TEST`; 
  // cookie.set("auth_token", SongrToken, { expires: 1 });
  // cookie.set("auth_user", {email: userData.email}, { expires: 1 });
  //Router.push("/chat");
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
          let token = cookie.get("auth_token");
          axios.post(`${songrService}user/${token}/connect-spotify`, null, {params: {spotify_refresh_token: res.data.refresh_token}});
          setTimeout(function() {
            refreshSpotifyToken();
          }, inOneHour)
        })
        .catch(err => console.error(err));
}

export const refreshSpotifyToken = () => {

    const headers = { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': "Basic M2NmZDRlMDhiNDdhNGZmMGEzZjZkOWUwNTU3ODUyMzc6ZDFiN2E1ZTJlZWVmNGI3ODhjZmY2M2JjOWUzZmIxZTE="
   };
    let data = { 
      grant_type: "refresh_token",  
      refresh_token: cookie.get("spotify_refresh_token"), 
      redirect_uri: redirectURI 
    };
    let inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
    axios.post(spotifyTokenURL, null, {headers, params: data})
        .then((res) => {
          console.log(res);
          cookie.set("spotify_token", res.data.access_token, { expires: inOneHour })
        })
        .catch(err => console.error(err));
}

export const signupUser = (newUserData, history) => {
  let isSuccess;
  axios
    .post(`${songrService}auth/signup`, null, {params: newUserData})
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
  let token = cookie.get("auth_token");
  axios
  .post(`${songrService}auth/signout`, null, {params: {token: token}})
  cookie.remove("spotify_token");
  cookie.remove("auth_token");
  cookie.remove("auth_user");
  // to support logging out from all windows
  cookie.set("logout", Date.now());
  delete axios.defaults.headers.common['Authorization'];
  Router.push('/');
};

export const getUserData = () => {
  axios
    .get("/user")
    .then(res => {
      cookie.set("auth_user", res.data);
    })
    .catch(err => console.log(err));
};

export const updateUserInfo = (formData) => {
  let token = cookie.get("auth_token");
  axios
    .post(`${songrService}user/${token}/set-user`, null, { params: formData })
    .then(() => {
      //get user data to see changes
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};


export const uploadImage = (image) => {
  let token = cookie.get("auth_token");
  const file = new Blob([image]);
  const formData = new FormData();
  formData.append('thumbnail', file, file.filename);
  axios
    .post(`${songrService}user/${token}/upload-thumbnail`, formData, {
      //headers: { 'content-type': 'multipart/form-data' }
    })
    .then(() => {
      //get user data to see thumbnail
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};