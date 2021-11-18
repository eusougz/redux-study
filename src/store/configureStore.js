import { configureStore } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import error from "./middleware/error";
import reducer from "./reducer";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      logger,
      error,
      api,
    ],
  });
}

// # Without toolkip
// import { createStore } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';

// export default function configureStore() {
//   const store = createStore(
//     reducer,
//     devToolsEnhancer({ trace: true })
//     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

//   return store;
// }
