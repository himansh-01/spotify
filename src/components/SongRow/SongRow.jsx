import React from 'react'
import './SongRow.css'
import { useDataLayerValue } from '../../DataLayer'

function SongRow({ track }) {
  const [ {items},dispatch] = useDataLayerValue()

  return (
    <div className='songRow' onClick={() => {
      dispatch({
        type: "SET_ITEMS",
        items: track
      });
      dispatch({
        type: "SET_PLAYING",
        playing: false
      })
    }}>
        <img className='songRow_album' src={track?.img} alt="no img" />
        <div className="songRow_info">
            <h1>{track.title}</h1>
            <p>{track.artist}, 
                {track.album}
            </p>
        </div>
    </div>
  )
}

export default SongRow