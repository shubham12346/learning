import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const gapActivityTabUrl = '/avery/regulations?tab=gapAssessment';

export const enum GapAssessmentScreens {
  ACTION_PLAN = 'actionPlan',
  EDIT_TASK = 'editTask',
  MORE_INFO = 'moreInfoTask'
}

export type optionsType = {
  id: string;
  value: string;
  label: string;
};

export type userOptionsType = {
  userUid: string;
  fullName: string;
};

export type MODAL_TYPE = 'UNSAVED' | 'DISCARD' | 'DELETE' | '';

let initialState = {
  gapAssessmentScreen: { screen: GapAssessmentScreens.ACTION_PLAN, id: '' },
  isActionPlanSaved: false as boolean,
  actionPlanId: '',
  discardModalOpen: {
    modalType: '' as MODAL_TYPE,
    open: false as boolean
  },
  taskStatus: [],
  ownerList: [],
  riskStatusLevelOptions: []
};

const gapSlice = createSlice({
  name: 'gapAnalysisSlice',
  initialState: initialState,
  reducers: {
    setGapAnalysisScreen: (state, action) => {
      state.gapAssessmentScreen = action.payload;
    },
    setActionPlanSaved: (state, action: PayloadAction<boolean>) => {
      state.isActionPlanSaved = action.payload;
    },
    setDiscardModalOpen: (
      state,
      action: PayloadAction<{ modalType: MODAL_TYPE; open: boolean }>
    ) => {
      state.discardModalOpen = action.payload;
    },
    setTaskStatusOptions: (state, action: PayloadAction<optionsType[]>) => {
      state.taskStatus = action.payload;
    },
    setOwnersListOptions: (state, action: PayloadAction<userOptionsType[]>) => {
      state.ownerList = action.payload;
    },
    setRiskLevelOptions: (state, action: PayloadAction<optionsType[]>) => {
      state.riskStatusLevelOptions = action.payload;
    }
  },
  extraReducers: {}
});

export const gapReducer = gapSlice.reducer;
export const {
  setGapAnalysisScreen,
  setActionPlanSaved,
  setDiscardModalOpen,
  setTaskStatusOptions
} = gapSlice.actions;
