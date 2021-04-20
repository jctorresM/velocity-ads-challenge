const rootReducer = (state, action) => {
  switch (action.type) {
    case 'PAUSED':
      return {
        ...state,
        isPaused: true,
      };
    case 'PLAYING':
      return {
        ...state,
        isPaused: false,
      };
    case 'SEEKING':
      return {
        ...state,
        isSeeking: action.data
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        time: action.data
      };
    case 'PLAYING_AD':
      return {
        ...state,
        isPlayingAdd: true,
        isPaused: true,
        currentAd: action.data
      };
    case 'FINISHED_AD':
      return {
        ...state,
        isPlayingAdd: false,
        isPaused: false,
        adStates: action.data,
        currentAd: null
      };
    case 'UPDATE_AD_TIME':
      return {
        ...state,
        adRemainingTime: action.data
      };
    default:
      return state;
  }
};

export default rootReducer;