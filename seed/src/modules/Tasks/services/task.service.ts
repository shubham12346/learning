import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type taskDropDownTypeOptions = {
  id: string;
  label: string;
  value: string;
};
export type taskScreenType = 'TaskAndCalendarView' | 'AddTaskView';
export type cadenceDropDownOptions = {
  id:string;
  name:string;
  displayName:string;
}

let initialState = {
  taskDropDown: [] as taskDropDownTypeOptions[],
  cadenceDropDown: [] as cadenceDropDownOptions[],
  screenType: 'TaskAndCalendarView' as taskScreenType,
  agencyList: [] as any,
  permissions: [] as string[]
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTaskDropDown: (
      state,
      action: PayloadAction<taskDropDownTypeOptions[]>
    ) => {
      state.taskDropDown = action.payload;
    },
    addCadenceDropDown:(state,action:PayloadAction<cadenceDropDownOptions[]>)=>{
      state.cadenceDropDown = action.payload
    },
    selectCurrentScreen: (state, action: PayloadAction<taskScreenType>) => {
      state.screenType = action.payload;
    },
    setAgencyList: (state, action: PayloadAction<any>) => {
      state.agencyList = action.payload;
    },
    setUserPermissionInTaskModule: (state, action: PayloadAction<any>) => {
      state.permissions = action.payload;
    }
  }
});

export const {
  addTaskDropDown,
  selectCurrentScreen,
  setAgencyList,
  setUserPermissionInTaskModule
} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
