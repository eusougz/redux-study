import { createAction, createReducer } from "@reduxjs/toolkit";

// Action types

const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators

export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description,
  },
});

export const bugAdded = createAction('bugAdded');
export const bugRemoved = createAction('bugRemoved');
export const bugResolved = createAction('bugResolved');

// Reducer
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );

    default:
      return state;
  }
}

export default createReducer([], {
  // actions: functions that handle those actions
  [bugAdded.type]: (state, action) => {
    state.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    })
  },
  [bugRemoved.type]: (bugs, action) => {
    bugs = bugs.filter((bug) => bug.id !== action.payload.id);
  },
  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex(bug => bug.id === action.payload.id);
    bugs[index].resolved = true;
  }
})
