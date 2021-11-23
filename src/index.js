import configureStore from './store-typescript/configureStore';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  // console.log('Store changed.', store.getState())
});

unsubscribe();
