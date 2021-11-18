import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name
      });
    }
  }
});

export const { userAdded } = actions;

export default reducer;
