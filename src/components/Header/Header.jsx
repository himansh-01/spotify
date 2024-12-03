import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useDataLayerValue } from '../../DataLayer';
import DarkMode from '../../DarkMode/DarkMode';

function Header() {
    const [{ user },] = useDataLayerValue()

  return (
    <div className='header'>
        <div className="header_left">
            <SearchIcon />
            <input className='header_input' placeholder='Search for Artists, Songs, or Podcasts' type='text' />
        </div>
        <div className="header_right">
            <Avatar src={user?.images[0]} alt={user?.display_name} />
            <h4>{user?.display_name}</h4>
            <DarkMode />
        </div>
    </div>
  )
}

export default Header