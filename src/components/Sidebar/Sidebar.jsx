import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from '../../DataLayer';
import { songs } from '../../song';

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue()

  const [id, setId] = useState(
    {
      idAlbum: 2115886,
      idArtist: 112024,
      idLabel: 47129,
      strAlbum: "Thursday",
      strAlbumThumb: "https://www.theaudiodb.com/images/media/album/thumb/thursday-4ee69293cd094.jpg",
      strDescriptionEN: "Thursday is the second mixtape of Canadian artist, The Weeknd, released August 18, 2011 via his official website. The release follows his critically acclaimed, Polaris Music Prize-nominated debut release House of Balloons earlier the same year. As with his previous works, production for Thursday was handled by Canadian producers Doc McKinney and Illangelo. Buzz singles \"Rolling Stone\" and \"The Birds Part 1\" preceded the album's release. Young Money artist Drake contributes guest vocals to track \"The Zone\". The mixtape's production is an experimental mix of downtempo, dubstep, hip hop, rock, and reggae influences and sounds. Thursday received generally positive reviews from music critics. At Metacritic, which assigns a normalized rating out of 100 to reviews from mainstream critics and fans, the album received an average score of 80, based on 17 reviews, which indicates \"generally favorable reviews\"."
    }
  )

  useEffect(() =>{
    dispatch({
      type: "SET_DISCOVER_WEEKLY",
      discover_weekly: id
    })
    dispatch({
      type: "SET_TOP_ARTISTS",
      top_artists: songs
    })
  },[dispatch, id])

  return (
    <div className='sidebar'>
        <img className='sidebar_logo' src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg' alt=''></img>
        <SidebarOption Icon={HomeIcon} title="Home" />
        <SidebarOption Icon={SearchIcon} title="Search" />
        <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
        
        <br />
        <strong className='sidebar_title'>PLAYLISTS</strong>
        <hr />
      <div className='album'>
        {playlists?.album?.map(playlist => (
          <div key={playlist.idAlbum} onClick={() => {
            setId(playlist)
          } }>
             <SidebarOption  title={playlist.strAlbum} />
          </div>
        ))}
      </div>  
    </div>
  )
}

export default Sidebar