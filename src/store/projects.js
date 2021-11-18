import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const { reducer, actions } = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({ id: ++lastId, name: action.payload.name });
    },
  },
});

export const { projectAdded } = actions;

export default reducer;
