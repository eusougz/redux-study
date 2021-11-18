import { reducer } from "../reducer";

function createStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(observer) {
    listeners.push(observer);
  }

  function dispatch(action) {
    state = reducer(state, action);

    // code src: https://github1s.com/reduxjs/redux/blob/HEAD/src/createStore.ts#L265-L268
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function getState() {
    // way to create private properties (state)
    return state;
  }

  return {
    subscribe,
    getState,
    dispatch,
  };
}

export default createStore(reducer);
