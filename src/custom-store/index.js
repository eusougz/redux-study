import store from './custom-store';
import * as actions from '../actions';

store.subscribe((currentState) => {
  console.log('Changed! o/');
  console.log(currentState);
})

store.dispatch(actions.bugAdded('New bug'));

store.dispatch(actions.bugAdded('Another bug'));

store.dispatch(actions.bugAdded('Last bug'));
