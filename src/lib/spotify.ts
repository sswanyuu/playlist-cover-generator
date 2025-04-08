import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "ugc-image-upload",
  "playlist-modify-public",
  "playlist-modify-private",
].join(",");

const params = {
  scope: scopes,
};

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?${new URLSearchParams(
  params
).toString()}`;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
