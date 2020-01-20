import { SET_MATCH, SET_MESSAGE, DELETE_MATCH } from "../types";
import { spotifyTokenURL, redirectURI, clientID, clientSecret, songrService } from "../../utils/constants";
import Router from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import qs from 'qs';

export const sendChatMessage = (message) => {
    console.log("wtf");
  
}

export const getChatMessage = (message) => {
    
}

export const leaveChat = (message) => {
    
    
}

export const getPreferenceMatch = () => {
    let token = JSON.parse(cookie.get("auth_token"));
    axios.get(`${songrService}user/${token}/get-preference-match`);
  }

  export const  getSpotifyMatch = () => {
    let token = JSON.parse(cookie.get("auth_token"));
    axios.get(`${songrService}user/${token}/get-spotify-match`);
  }

