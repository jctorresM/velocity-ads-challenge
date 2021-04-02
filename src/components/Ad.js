import React, { useContext, useEffect } from 'react';
import { Context } from '../App';
const adImgURL = process.env.PUBLIC_URL + '/AdBreak21-9.jpg';

const Ad = ({ videoRef }) => {
  const { dispatch, state } = useContext(Context);

  /**
   * This function will initialize an interval that will decrease
   * the remaining time of the AD every second until it reaches 0
   */
  const initAdCountdown = () => {
    const adCountdown = setInterval(function () {
      dispatch({ type: 'UPDATE_AD_TIME', data: state.adRemainingTime - 1 });
      if (state.adRemainingTime === 0) {
        // resume video and dispatch action when ad countdown is 0
        videoRef.current.play();
        dispatch({ type: 'FINISHED_AD' });
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
  }, [state]);

  return (
    <>
      <img style={styles.ad} src={adImgURL} alt='Advertisement' />
      <h3 style={styles.chronometer}>Ad closes in {state.adRemainingTime}s</h3>
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
  chronometer: {
    position: 'absolute',
    zIndex: 3,
    color: "white",
    top: "57%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

export default Ad;