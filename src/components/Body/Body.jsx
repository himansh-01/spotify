import React, { useState } from 'react'
import './Body.css'
import { useDataLayerValue } from '../../DataLayer'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from '../SongRow/SongRow';
import Header from '../Header/Header'

function Body({ spotify }) {
  const [{ discover_weekly, top_artists },] = useDataLayerValue()

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src={discover_weekly?.strAlbumThumb} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.strAlbum}</h2>
          <p>{discover_weekly.strDescriptionEN ? (discover_weekly?.strDescriptionEN?.slice(0, 1000)+ ".....") : "..."}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
          
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {top_artists?.map((item) => (
          <SongRow key={item.title} track={item} />
        ))}
      </div>
    </div>
  );
}

export default Body
