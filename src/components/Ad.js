import React, { useContext, useEffect } from 'react';
import { Context } from '../App';
const adImgURL = process.env.PUBLIC_URL + '/AdBreak21-9.jpg';

const Ad = ({ onAdClosing }) => {
  const { dispatch, state } = useContext(Context);

  /**
   * This function will initialize an interval that will decrease
   * the remaining time of the AD every second until it reaches 0
   */
  const initAdCountdown = () => {
    let adRemainingTime = state.currentAd.duration;
    dispatch({ type: 'UPDATE_AD_TIME', data: adRemainingTime });
    const adCountdown = setInterval(function () {
      adRemainingTime -= 1;
      dispatch({ type: 'UPDATE_AD_TIME', data: adRemainingTime });

      if (adRemainingTime === 0) { 
        // resume video and dispatch action when ad countdown is 0
        const adState = state.adsState.find(a => a.start === state.currentAd.start);
        adState.hasAdBeenPlayed = true;
        dispatch({ type: 'FINISHED_AD', data: state.adsState });

        onAdClosing();

        clearInterval(adCountdown);
      }
    }, 1000);

    return adCountdown;
  }

  /**
   * This effect will initilize the AD countdown and clear 
   * the interval once the component unmounted
   */
  useEffect(() => {
    const adCountdown = initAdCountdown();
    return () => {
      clearInterval(adCountdown);
    }
  }, []);

  return (
    <>
      <img style={styles.ad} src={adImgURL} alt='Advertisement' />
      <h3 style={styles.timer}>Ad closes in {state.adRemainingTime}s</h3>
    </>
  );
}

const styles = {
  ad: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%'
  },
  timer: {
    position: 'absolute',
    zIndex: 3,
    color: "white",
    top: "57%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

export default Ad;