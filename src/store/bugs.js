import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const { reducer, actions } = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFail: (bugs, action) => {
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const { id: bugId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id !== action.payload.id);
      bugs.list.splice(index - 1, 1);
    },

    bugAssigned: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  bugsRequested,
  bugsReceived,
  bugsRequestFail,
} = actions;

export default reducer;

// Action Creators
const url = "/bugs";

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (bugId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBug = ({ bugId, userId }) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssigned.type,
  });

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // cancel load bugs if did not pass 10 minutes of last fetch
  const cacheTimeMinutes = 10;
  if (
    lastFetch >
    new Date(new Date().getTime() - cacheTimeMinutes * 60000).getMinutes()
  )
    return;

  return dispatch(
    apiCallBegan({
      url,
      onStartLoading: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFail.type,
    })
  );
};

// # Without check lastFetch (cache)
// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStartLoading: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFail.type,
//   });

// Selector
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

export const getAssignedBugsToUser = createSelector(
  [
    (state) => state.entities.bugs,
    (state, id) => id,
  ],
  (bugs, id) => bugs.list.filter((bug) => bug.userId === id)
);

// # Without memoization
// export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved);
