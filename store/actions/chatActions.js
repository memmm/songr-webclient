import { SET_MATCH, SET_MESSAGE, DELETE_MATCH } from "../types";
import { spotifyTokenURL, redirectURI, clientID, clientSecret, songrService } from "../../utils/constants";
import Router from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import qs from 'qs';

var intervalID;
const getUserProp = (prop) => {
  var user = JSON.parse(localStorage.getItem('auth_user'));
  return user[prop];
}

export const sendChatMessage = (partnerId, message) => {
    let token = cookie.get("auth_token");
    axios.post(`${songrService}chat/${token}/send-message`, null, { 
      headers: {'Content-Type': 'application/json'}, 
      params: { senderId: getUserProp('id'), receiverId: partnerId, message: message } });
  
}

export const getChatMessage = () => {
  let token = cookie.get("auth_token");
  axios.post(`${songrService}chat/${token}/get-messages`, null, { 
    headers: {'Content-Type': 'application/json'}, 
    params: { userId: getUserProp('id') } });
}

export const leaveChat = (partnerId) => {
  let token = cookie.get("auth_token");
  axios.post(`${songrService}chat/${token}/endConversation`, null, {
    headers: {'Content-Type': 'application/json'}, 
    params: { senderId: getUserProp('id'), receiverId: partnerId }});
  clearInterval(intervalID);
    
}

export const joinPreferenceQueue = () => {
    let token = cookie.get("auth_token");
    axios.post(`${songrService}chat/${token}/join-preference-queue`, null, {
      headers: {'Content-Type': 'application/json'},
      params:{ userId: getUserProp('id'), userName: getUserProp('userName') }})
    .then(res => {
      console.log(res.data);
      intervalID = setInterval(getChatMessage(), 5000);
    })
    .catch(err => {
      console.error(err);
    });
  }

export const joinSpotifyQueue = () => {
    let token = cookie.get("auth_token");
    axios.post(`${songrService}chat/${token}/join-spotify-queue`, null, {
      headers: {'Content-Type': 'application/json'},
      params: { userId: getUserProp('id'), userName: getUserProp('userName')}});
  }

