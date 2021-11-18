import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action)

  const { url, method, data, onStartLoading, onSuccess, onError } = action.payload;

  if (onStartLoading) dispatch({ type: onStartLoading });

  next(action);

  try {
    const res = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data,
      
    });

    // General
    dispatch(actions.apiCallSuccess(res.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: res.data });

  } catch(error) {
    // General
    dispatch(actions.apiCallFail(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message })
  }
}

export default api;