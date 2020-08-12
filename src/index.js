import { store } from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

store.subscribe(() => {
    console.log('Store changed.', store.getState())
})

store.dispatch(bugAdded('Harry potter'));
store.dispatch(bugAdded('Clean code'));

store.dispatch(bugResolved(1));

store.dispatch(bugRemoved(1));

store.dispatch(bugResolved(2));