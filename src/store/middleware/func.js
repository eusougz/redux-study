// Thats implementation is already implemented by redux-thunk middleware
// available on redux toolkit.

const func = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function')
    action(dispatch, getState);
  else 
    next(action);
}

export default func;