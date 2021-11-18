const error = store => next => action => {
  if (action.type === 'error') {
    console.log('Tostify: ', action.message);
  } else {
    next(action);
  }
}

export default error;
