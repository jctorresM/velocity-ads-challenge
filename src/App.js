import React, { useReducer } from 'react';
import adsData from './data/ads.json';
import rootReducer from './RootReducer';
import Player from './components/Player';

const Context = React.createContext();
const { Provider } = Context;

const initialState = {
  isPaused: false,
  isSeeking: false,
  time: 0,
  isPlayingAdd: false,
  adsState: adsData,
  adRemainingTime: 0,
  currentAd: {}
}

function App() {
  // add useReducer hook to manage state across components
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = {
    dispatch,
    state,
    getState: () => state,
  };

  return (
    <Provider value={store}>
      <div style={styles.container}>
        <Player />
      </div>
    </Provider>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: 436,
    width: 1024,
    position: 'relative'
  }
};

export { Context, App as default };
