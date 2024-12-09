import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js"
import Player from './components/Player/Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi()

function App() {
  const [{ token }, dispatch] = useDataLayerValue()

  const [track, setTrack] = useState([])

  useEffect(() =>{
    fetch('https://www.theaudiodb.com/api/v1/json/2/album.php?i=112024').then(res => res.json()).then(data =>setTrack(data))
  },[])
  

  useEffect(() => {
    const hash = getTokenFromUrl()
    const _token = hash.access_token
    window.location.hash = ""

    dispatch({
      type: "SET_PLAYLIST",
      playlists: track
    })

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

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      }); 
    } 
  }, [token, dispatch, track])

  return (
    <div className="app">
    {!token && <Login />}
    {token && <Player spotify={spotify} />}
  </div>
  );
}

export default App;
