import React, { useRef, useContext } from 'react';
import Ad from './Ad';
import { Context } from '../App';

const Player = () => {
  const videoRef = useRef(null);
  const { dispatch, state } = useContext(Context);

  const onPlay = () => {
    dispatch({ type: 'PLAYING' });
  }

  const onPause = () => {
    dispatch({ type: 'PAUSED' });
  }

  const onSeeked = () => {
    dispatch({ type: 'SEEKING', data: false });
  }

  const onSeeking = () => {
    dispatch({ type: 'SEEKING', data: true });
  }

  const onAdClosing = () => {
    // verify if there's another add in queue (because of seeking), otherwise resume video
    const ad = state.adsState.find(x => state.time >= x.start && !x.hasAdBeenPlayed);
    if (ad) {
      dispatch({ type: 'PLAYING_AD', data: {...ad} });
      return;
    }

    videoRef.current.play();    
  }

  /**
   * This event handler will evaluate when the AD should be played
   * following the business rules and the AD start time defined in ads.json
   */
  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const { currentTime } = videoRef.current;
    dispatch({ type: 'UPDATE_TIME', data: Math.floor(currentTime) });

    // User is seeking or video is in full screen mode
    if (state.isSeeking || document.fullscreenElement) 
      return; 
      
    // find ad and show it
    const ad = state.adsState.find(x => state.time >= x.start && !x.hasAdBeenPlayed);
    if (ad) {
      videoRef.current.pause();
      dispatch({ type: 'PLAYING_AD', data: {...ad} });
    }
  }

  return (
    <>
      <video
        style={styles.video}
        controls
        onPause={onPause}
        onPlay={onPlay}
        onSeeked={onSeeked}
        onSeeking={onSeeking}s
        onTimeUpdate={onTimeUpdate}
        ref={videoRef}
        src="http://www.peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
        {state.isPlayingAdd && <Ad onAdClosing={onAdClosing}></Ad> }
    </>

  );
}

const styles = {
  video: {
    flex: 1
  }
}

export default Player;
