import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actions: []
};

const myDocsSlice = createSlice({
  initialState: initialState,
  name: 'myDocsSlice',
  reducers: {
    userActions: (state, action) => {
      state.actions = action.payload;
    }
  }
});

export const myDocsReducer = myDocsSlice.reducer;
export default myDocsSlice;
export const { userActions } = myDocsSlice.actions;
