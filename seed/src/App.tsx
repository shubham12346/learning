import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { useState } from 'react';
import router from './router/router';
import './scss/commonStyle.scss';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { Provider } from 'react-redux';
import { themeCreator } from '../src/core/theme/base';
import { persistor, store } from '../src/store/configure-store';
import { AuthProvider } from './providers/AuthguardContext';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';

const App = () => {

  const [themeName, _setThemeName] = useState('PureLightTheme');
  const theme = themeCreator(themeName);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <ToastContainer
                  autoClose={4000}
                  className="toastContainer"
                  position={'top-right'}
                  closeOnClick
                  pauseOnHover
                />
                <RouterProvider router={router} />
              </LocalizationProvider>
            </ThemeProvider>
          </StylesProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
