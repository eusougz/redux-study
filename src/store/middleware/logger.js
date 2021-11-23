/**
 * @param store Seems like a store, but it is not. Only have store methods: getState and dispatch
 * @param next It is a reference to call the next middleware. If doesn't exist, is a function to call root reducer.
 */
const logger = store => next => action => {
  return next(action);
}

export default logger;
