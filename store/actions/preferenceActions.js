import cookie from "js-cookie";
const token = cookie.get("auth_token");

export const addGenre = (genre) => {
    axios
      .post(`${songrService}user/${token}/set-genre`, null, {params: {genre: genre}})
      .then((res) => {
        //TODO refresh localStorage
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export const addArtist = (artist) => {
    axios
      .post(`${songrService}user/${token}/set-artist`, null, {params: {artist: artist}})
      .then((res) => {
        //TODO refresh localStorage
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export const addTrack = (track) => {
    axios
      .post(`${songrService}user/${token}/set-track`, null, {params: {artist: track.artist, title: track.title}})
      .then((res) => {
        //TODO refresh localStorage
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export const deleteGenre = (genre) => {
    axios
      .post(`${songrService}user/${token}/delete-genre`, null, {params: {genre: genre}})
      .then((res) => {
        //TODO refresh localStorage
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export const deleteArtist = (artist) => {
    axios
      .post(`${songrService}user/${token}/delete-genre`, null, {params: {artist: artist}})
      .then((res) => {
        //TODO refresh localStorage
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export const deleteTrack = (track) => {
    axios
      .post(`${songrService}user/${token}/delete-genre`, null, {params: {artist: track.artist, title: track.title}})
      .then((res) => {
        //TODO refresh localStorage
      })
      .catch((err) => {
        console.error(err);
      });
  };