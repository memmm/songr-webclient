import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "../types";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import axios from "axios";

export const loginUser = userData => dispatch => {
  // dispatch({ type: LOADING_UI });
  // axios
  //   .post(`/signin`, userData)
  //   .then(res => {
  //     // const SongrToken = `Bearer ${res.data.token}`;
  //     const SongrToken = `Bearer TEST`;
  //     cookie.set("auth_token", SongrToken, { expires: 1 });
  //     axios.defaults.headers.common["Authorization"] = SongrToken;
  //     dispatch(getUserData());
  //     dispatch({ type: CLEAR_ERRORS });
  //     Router.push("/chat");
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
  //This dispatch is only for test:
  dispatch({
    type: SET_USER,
    payload: { userName: "Teszt Elek", email: "tesztelek@kukac.nl" }
  });
  dispatch({
    type: SET_AUTHENTICATED
  });
  Router.push("/chat");
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  cookie.remove("spotify_token");
  cookie.remove("auth_token");
  // to support logging out from all windows
  cookie.set("logout", Date.now());
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
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