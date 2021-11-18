import configureStore from "./store/configureStore";
import { loadBugs, addBug, assignBug, resolveBug } from "./store/bugs";

const store = configureStore();

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(addBug({ description: "Test" }));
  store.dispatch(assignBug({ bugId: 4, userId: 1 }));
  store.dispatch(resolveBug(2));
}, 2000);

const unsubscribe = store.subscribe(() => {
  // console.log('Store changed.', store.getState())
});

unsubscribe();
