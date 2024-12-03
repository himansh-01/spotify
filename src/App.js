import { useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js"
import Player from './components/Player/Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi()

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromUrl()
    const _token = hash.access_token
    window.location.hash = ""

    if(_token){

      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      spotify.setAccessToken(_token)

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      })
      spotify.getUserPlaylists().then((playlists) =>{
        dispatch({
          type: "SET_PLALISTS",
          playlists: playlists
        })
      })

      spotify.getPlaylist().then(response =>{
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      })

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        })
      })  
    } 
  }, [token, dispatch])

  // console.log('person', user)
  console.log('token', token)

  return (
    <div className="app">
    {!token && <Login />}
    {token && <Player spotify={spotify} />}
  </div>
  );
}

export default App;
