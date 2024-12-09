import React, { useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useDataLayerValue } from '../../DataLayer';
import DarkMode from '../../DarkMode/DarkMode';

function Header() {
    const [{ user },] = useDataLayerValue()
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')

    const handleInput = (event) => {
      setSearch(event.target.value)
    }

    const showBox = () => {
      setShow(!show)
    }

    const handleLogout = () => {
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
      window.location.href = "https://spotify-lac-iota.vercel.app/";
      alert("you have logged out")
    };

  return (
    <div className='header' onScrollCapture={() => {setShow(false)}}>
      {/* <div className='searchbox' style={{
        opacity: show ? 1: 0,
        visibility: show ? 1:0
      }}>{playlists?.album?.map(() => (search == playlists.strAlbum ? 
      <div className='output_box'>
        <div className='output_img'><img src={playlists.strAlbumThumb}/></div>
        <div className='output_text'>{playlists.strAlbum}</div>
      </div> : "" ))}</div> */}
        <div className="header_left" onClick={showBox}>
            <SearchIcon />
            <input className='header_input' placeholder='Search for Artists, Songs, or Podcasts' type='text' name='input' value={search} onChange={handleInput}  />
        </div>
        <div className="header_right">
            <Avatar src={user?.images[0]} alt={user?.display_name} />
            <h4>{user?.display_name}</h4>
            <button onClick={handleLogout} className='logout_button'>
              Logout
           </button>

            <DarkMode />
        </div>
    </div>
  )
}

export default Header