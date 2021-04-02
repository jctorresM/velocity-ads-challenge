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

  /**
   * This event handler will evaluate when the AD should be played
   * following the business rules and the AD start time defined in ads.json
   */
  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const { currentTime } = videoRef.current;
    dispatch({ type: 'UPDATE_TIME', data: currentTime });

    // validate if AD has been played or user is seeking or video is in full screen mode
    if (state.hasAdBeenPlayed || state.isSeeking || document.fullscreenElement) 
      return; 

    // show AD
    if (currentTime >= state.adStart) {
      videoRef.current.pause();
      dispatch({ type: 'PLAYING_AD' });
      // TODO: add support for full screen mode
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
        {state.isPlayingAdd && <Ad videoRef={videoRef}></Ad> }
    </>

  );
}

const styles = {
  video: {
    flex: 1
  }
}

export default Player;
