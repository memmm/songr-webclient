const scopes =
  "user-read-private+user-read-email+playlist-read-private+user-top-read+" +
  "user-read-recently-played+user-modify-playback-state+" +
  "streaming+app-remote-control+user-read-playback-state+user-read-currently-playing";
export const redirectURI = "http://localhost:3000/chat";
//const redirectURI = "https://songr-webclient.now.sh/";

export const clientID = "3cfd4e08b47a4ff0a3f6d9e055785237";
export const clientSecret = "d1b7a5e2eeef4b788cff63bc9e3fb1e1";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes}&show_dialog=true`;
export const spotifyTokenURL = `https://accounts.spotify.com/api/token`
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifyCurrentlyPlayingURL =
  "https://api.spotify.com/v1/me/player?access_token=";
export const spotifyPause = "https://api.spotify.com/v1/me/player/pause";
export const spotifyPlaylistURL =
  "https://api.spotify.com/v1/me/playlists?access_token=";
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";
