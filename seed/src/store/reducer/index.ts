import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import commonReducer from 'src/modules/common/services/common.service';
import { adminRegulation } from 'src/modules/AdminRegulation/service/adminRegulation.service';
import { adminRegulationReviewed } from 'src/modules/AdminRegulation/service/adminRegulationLibrary.service';
import { myDocsReducer } from 'src/modules/MyDocs/service/gapAnalysis.service';
import { gapReducer } from 'src/modules/GapActionPlan/service/gapAction.service';
import { taskReducer } from 'src/modules/Tasks/services/task.service';
import tourReducer from 'src/modules/Tours/service/tour.service';
import dataCopilot from 'src/modules/DataCoPilot/service/datacopilot.service';

const combinedReducer = combineReducers({
  common: commonReducer,
  adminRegulation: adminRegulation,
  adminRegulationReviewed: adminRegulationReviewed,
  myDocs: myDocsReducer,
  gapAnalysis: gapReducer,
  tasks: taskReducer,
  tour: tourReducer,
  dataCopilot: dataCopilot
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type.indexOf('/clearResults') > -1) {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root');

    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
