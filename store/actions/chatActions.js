import { SET_MATCH, SET_MESSAGE, DELETE_MATCH } from "../types";
import { spotifyTokenURL, redirectURI, clientID, clientSecret, songrService } from "../../utils/constants";
import Router from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import qs from 'qs';

export const sendChatMessage = (message) => {
    let token = cookie.get("auth_token");
    axios.post(`${songrService}chat/${token}/send-message`, null, { userId: "elsoke", chatId: "1", message: "testmessage" });
  
}

export const getChatMessage = () => {
  let token = cookie.get("auth_token");
  axios.post(`${songrService}chat/${token}/get-messages`, null, { userId: "elsoke" });
}

export const leaveChat = (message) => {
  let token = cookie.get("auth_token");
  axios.post(`${songrService}chat/${token}/endConversation`, null, { chatId: "elsoke" });
    
}

export const getPreferenceMatch = () => {
    let token = cookie.get("auth_token");
    axios.post(`${songrService}chat/${token}/join-preference-queue`, null, {params:{ userId: token, userName: "elsoke" }});
  }

export const getSpotifyMatch = () => {
    let token = cookie.get("auth_token");
    axios.post(`${songrService}chat/${token}/join-spotify-queue`, null, {params: { userId: token, userName: "elsoke"}});
  }

