import React, { useRef, useEffect, useState } from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Grid, Slider, unstable_createBreakpoints } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useDataLayerValue } from '../../DataLayer';

function Footer() {
  const [{ items, playing, volume = 50, top_artists }, dispatch] = useDataLayerValue();
  const currentAudio = useRef();
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [number, setNumber] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0);
  const [repeat, setRepeat] = useState(0)

  useEffect(() => {
    if (currentAudio.current) {
      currentAudio.current.volume = currentVolume / 100; // Audio volume must be between 0 and 1
    }
  }, [currentVolume]);

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    } else {
      currentAudio.current.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      });
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setCurrentVolume(newValue);
    dispatch({
      type: 'SET_VOLUME',
      volume: newValue,
    });
  };

  const handlePrevSong = ()=>{
    setAudioProgress(0)
    if (items.id === 1) {
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[0]
      });
    }else{
       setNumber(items.id - 2);
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[number]
      })
    }
    dispatch({
      type: "SET_PLAYING",
      playing: false
    })
  }

  const handleNextSong = ()=>{
    setAudioProgress(0)
    if (items.id === 5) {
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[4]
      });
    }
    else{
       setNumber(items.id);
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[number]
      })
    }
    dispatch({
      type: "SET_PLAYING",
      playing: false
    })
  }

  const handleNextShuffleSong = ()=>{
    setAudioProgress(0)
    if (items.id === 5) {
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[4]
      });
    } 
    if(shuffle == true) {
      const random = Math.floor(Math.random() * 5) + 1
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[random]
      })
    }
    if(shuffle == false && items.id !== 5){
      const div= items.id
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[div]
      })
    }
    else{
       setNumber(items.id);
      dispatch({
        type: "SET_ITEMS",
        items: top_artists[number]
      })
    }
    dispatch({
      type: "SET_PLAYING",
      playing: false
    })
  }

  const shuffleOn = () =>{
    setShuffle(!shuffle)
    if(repeat == true){
      setShuffle(false)
    }
  }

  const handleMusicProgressBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={items?.img || ''}
          alt={items?.title || 'No song playing'}
        />
        {items ? (
          <div className="footer__songInfo">
            <h4>{items.title}</h4>
            <p>{items.artist}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
        <div className='musicbar'>
          <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
        </div>
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" onClick={shuffleOn} style={{
          background : shuffle ? 'var(--sidebar_background)' : '',
          borderRadius: shuffle ? '50%' : '0%',
        }} />
        <span><SkipPreviousIcon className="footer__icon" onClick={handlePrevSong}/></span>
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handleAudioPlay}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handleAudioPlay}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon className="footer__icon" onClick={handleNextSong} />
        <RepeatIcon className="footer__green" onClick={() => {setRepeat(!repeat)
         if(shuffle == true){
          setRepeat(false)
         }
         }} style={{
          background : repeat ? 'var(--sidebar_background)' : '',
          borderRadius: repeat ? '50%' : '0%',
        }} />
      </div>

      <div className="footer__right">
        <audio ref={currentAudio} src={items?.music} type="audio/mpeg" onEnded={handleNextShuffleSong} />
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={currentVolume}
              onChange={handleVolumeChange}
              defaultValue={50}
              step={1}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>
            <VolumeUpIcon />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
