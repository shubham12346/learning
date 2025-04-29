import { createSlice } from '@reduxjs/toolkit';
import { ChatBotQuestions } from '../model';
type stateType = {
  sampleQuestions: ChatBotQuestions[] | [];
};
let initialState: stateType = {
  sampleQuestions: []
};
const dataCopiloSlice = createSlice({
  name: 'dataCopilot',
  initialState: initialState,
  reducers: {
    setSampleQuestions: (state, actions) => {
      state.sampleQuestions = actions.payload;
    }
  }
});

export const { setSampleQuestions } = dataCopiloSlice.actions;
export default dataCopiloSlice.reducer;
