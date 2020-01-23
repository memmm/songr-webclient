import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { connect } from "react-redux";
import { spotifyTokenURL, redirectURI, clientID, clientSecret, songrService } from "../utils/constants";

import Layout from "../components/Layout";
import ChatCard from "../components/ChatCard";
import MusicController from "../components/MusicController";
import ChatStream from "../components/ChatStream";
import { connectSpotifyToUser, refreshSpotifyToken, logoutUser } from "../store/actions/userActions";

//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

var intervalID;
var token;

class Chat extends React.Component {
  constructor(props) {
    //if (!cookie.get("auth_token"))
    //TODO redirect to home if not auth
    super(props);
    this.state = {
      chats: [],
      currentChatPartner: { name: "", messages: []},
      selectedQueue: "spotify"
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("code") > -1 && !cookie.get("spotify_token")) {
      let spotify_code = url
        .split("code=")[1]
        .split("&")[0]
        .trim();
      connectSpotifyToUser(spotify_code); 
    }
    if (cookie.get("spotify_refresh_token") && !cookie.get("spotify_token")) {
      refreshSpotifyToken();
    }
    token = cookie.get("auth_token");
    //setTimeout(this.setState({chats:getChats()}), 5000);
  };


  handleOptionChange = changeEvent => {
    this.setState({
      selectedQueue: changeEvent.target.value
    });
  };

  //Join Queue
  newChat = e => {
    e.preventDefault();
    if (this.state.selectedQueue === "spotify")
      this.joinSpotifyQueue();
    else this.joinPreferenceQueue();
    //TODO: set gotten match in localStore and/or state
    localStorage.setItem('chats', JSON.stringify(this.state.chats))
  }


  render() {
    return (
      <Layout>
        <div className="chat-container flex-grow-1 flex-md-grow-0 m-md-auto d-flex flex-column">
          <div className="d-flex flex-column flex-md-row flex-grow-1">
            <div className="mx-3 flex-md-grow-0">
              <Form onSubmit={this.newChat} className="py-1 py-md-3 border-bottom border-info d-flex align-items-center justify-content-between">
                <div className="">
                  <p className="d-block mb-1 font-weight-bold">Based on:</p>
                  <div>
                    <input type="radio"
                                value="preferences" 
                                name="queue-option"
                                checked={this.state.selectedQueue === "preferences"}
                                onChange={e => this.handleOptionChange(e)}/> Preferences
                  </div>
                  <div>
                    <input type="radio" 
                                value="spotify" 
                                name="queue-option"
                                checked={this.state.selectedQueue === "spotify"}
                                onChange={e => this.handleOptionChange(e)}/> Spotify
                  </div>
                </div>
                <div>
                  <Button type="submit">NEW CHAT</Button>
                </div>
              </Form>
              <div className="d-flex d-md-block my-2 my-md-0">
                {this.state.chats.map((x, i) => (
                  <ChatCard
                    key={i}
                    match={x}
                    onClick={() => this.setState({ currentChatPartner: x })}
                  ></ChatCard>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column flex-md-grow-1 ml-auto mr-4">
              <div className="my-3 p-md-3 rounded-top d-flex align-items-center">
                <Image
                  src="/static/pusheen.jpg"
                  className="partner-thumbnail img-thumbnail rounded-circle mr-3"
                />
                <span className="font-weight-bold">{this.state.currentChatPartner.name} &nbsp;</span>
                <p className="mb-0"> now listening to Six Foe: <b>Seasons</b></p>
                <Button className="ml-auto" onClick={e => this.leaveChat(e)}>
                  Leave chat
                </Button>
              </div>
              <ChatStream chatPartner= {this.state.currentChatPartner} />
            </div>
          </div>
          <div className="m-4">
              <MusicController />
          </div>
        </div>
      </Layout>
    );
  }

  getUserProp = (prop) => {
    var user = JSON.parse(localStorage.getItem('auth_user'));
    return user[prop];
  }

  getChats = () => {
    var chats = JSON.parse(localStorage.getItem('chats'));
    return chats;
  }

  setChats = (chats) => {
    localStorage.setItem(JSON.stringify(chats));
  }

  joinPreferenceQueue = () => {
    clearInterval(intervalID);
    axios.post(`${songrService}chat/${token}/join-preference-queue`, null, {
      headers: {'Content-Type': 'application/json'},
      params:{ userId: this.getUserProp('id'), userName: this.getUserProp('userName') }})
    .then(res => {
      if (res.data.messages != null){
        console.log(res.data);
        var m = res.data.messages.find(x => x.response.userName != null);
          if (m != null) {
            m = m.response;
            let newPartner = {name: m.userName, userId: m.userId, thumbnail: m.profileImage, messages: []};
            this.setState({chats: [...this.state.chats, newPartner]});
            this.setState({currentChatPartner: newPartner});
          }
      }
      intervalID = setInterval(this.getChatMessage, 5000);
    })
    .catch(err => {
      console.error(err);
    });
  }

  joinSpotifyQueue = () => {
    
    axios.post(`${songrService}chat/${token}/join-spotify-queue`, null, {
      headers: {'Content-Type': 'application/json'},
      params: { userId: this.getUserProp('id'), userName: this.getUserProp('userName')}});
  }

  leaveChat = (e) => {
    e.preventDefault();
    axios.post(`${songrService}chat/${token}/endConversation`, null, {
      headers: {'Content-Type': 'application/json'}, 
      params: { senderId: this.getUserProp('id'), receiverId: this.state.currentChatPartner.userId }});
    clearInterval(intervalID);
    this.setState({});
    // var chats = getChats();
    // var chatToRemove = chats.map(x => x.id == partnerId);
    // chats.splice( chats.indexOf(chatToRemove), 1 );  
    // setChats(chats);
  }

  getChatMessage = () => {
    axios.post(`${songrService}chat/${token}/get-messages`, null, { 
      headers: {'Content-Type': 'application/json'}, 
      params: { userId: this.getUserProp('id') } })
      .then(res => {
        if (res.data.messages != null){
            var m = res.data.messages.find(x => x.response.userName != null);
            if (m != null) {
              m = m.response;
              let newPartner = {name: m.userName, userId: m.userId, thumbnail: m.profileImage, messages: []};
              this.setState({chats: [...this.state.chats, newPartner]});
              this.setState({currentChatPartner: newPartner});
            }
        }
          // var chats = getChats();
          // chats.push({
          //   name: newUser.userName,
          //   id: newUser.userId,
          //   messages: []
          // });
         // localStorage.setItem('chats', chats);
        
      })
      .catch(err => {
        console.error(err);
      });
  }

  

  getPartner = (data) => {
    if (data.messages != null){
      console.log(data);
    var m = data.messages.find(x => x.response.userName != null).response;
        console.log(m);
        if (m != null) {
          let newPartner = {name: m.userName, userId: m.userId, thumbnail: m.profileImage, messages: []};
          this.setState({chats: [...this.state.chats, newPartner]});
          this.setState({currentChatPartner: newPartner});
        }
    }
  }
  
}

export default connect()(Chat);
