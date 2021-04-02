# State management

The state of the application is managed using the hooks **UseReducer** and **UseContext**

### Initial State

The initial state of the application was defined following the business rules specified in the requirements. The properties specific to the AD component itself are *isPlayingAdd*, *hasAdBeenPlayed*, *adStart*, *adRemainingTime*

```javascript
const initialState = {
  isPaused: false,
  isSeeking: false,
  time: 0,
  isPlayingAdd: false,
  hasAdBeenPlayed: false,
  adStart: adsData[0].start,
  adRemainingTime: 10
}
```

### Reducer

A reducer file with the definition of actions and state changes can be found in the **src** folder with the name ``RootReducer.js``. The ``state`` and ``dispatch`` objects returned from **useReducer** are saved in a *store* object that will be passed down to the child components using a context provider.

```javascript
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = {
    dispatch,
    state,
    getState: () => state,
  };
```

### Context

**UseContext** is used to facilitate the state management between components and reduce the necessity of passing down property values between component 

```javascript
const { dispatch, state } = useContext(Context);
```

  
# Ad Logic

The Ad showing logic was defined following the business rules. The add is mounted any time the playback time surpasses the ad starting time, it doesn't matter if the user was seeking. The ad will stop showing once it has already shown up once. Note that this only works on normal screen, not on full screen mode. 

```javascript
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
```

### Countdown

A countdown was included using a javascript timer that will start from the ad duration defined in the state and run down until it reaches 0, at that point the ad is unmounted and the video resumed.


```javascript
const adCountdown = setInterval(function () {
  dispatch({ type: 'UPDATE_AD_TIME', data: state.adRemainingTime - 1 });
  if (state.adRemainingTime === 0) {
    // resume video and dispatch action when ad countdown is 0
    videoRef.current.play();
    dispatch({ type: 'FINISHED_AD' });
    clearInterval(adCountdown);
  }
}, 1000);
```

# Solution

The solution took about 3 hours to finish

# Areas of improvements

Definitely the ad should be displayed when the video is in full screen, right now this solution doesn't handle this mode. I added a TODO to address this in the future.
