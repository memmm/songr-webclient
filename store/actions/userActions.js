import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import axios from "axios";

export const loginUser = userData => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/signin`, userData)
    .then(res => {
      const SongrToken = `Bearer ${res.data.token}`;
      cookie.set("auth_token", SongrToken, { expires: 1 });
      axios.defaults.headers.common["Authorization"] = SongrToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      Router.push("/chat");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
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
