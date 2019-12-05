const scopes =
  "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const redirectURI = "http://localhost:3000/chat";

export const clientID = "3cfd4e08b47a4ff0a3f6d9e055785237";
export const clientSecret = "d1b7a5e2eeef4b788cff63bc9e3fb1e1";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifyPlaylistURL =
  "https://api.spotify.com/v1/me/playlists?access_token=";
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";
