import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
});
export const persistor = persistStore(store);
