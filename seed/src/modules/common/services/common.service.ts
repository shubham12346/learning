import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUserDataToLocalStore } from 'src/auth/RBAC/utils';
import {
  getOriginalTokenApi,
  loginAsApi,
  tokenExchangesApi
} from 'src/auth/apis/AuthApi';
import { showErrorMessage } from 'src/shared/components/toaster/Toast';
interface CommonState {
  loading?: boolean;
  userData: any;
  loggedInUserData: any;
  authUserData: any;
  afterLogin: boolean;
  fusion1: string;
}
const initialState: CommonState = {
  loading: false,
  userData: {} as any,
  loggedInUserData: {},
  authUserData: {},
  afterLogin: false,
  fusion1: ''
};

// TODO API call here
export const tokenExchange = createAsyncThunk(
  'common/tokenExchange',
  async (payload: any) => {
    const response = await tokenExchangesApi(payload);
    const userData = await setUserDataToLocalStore(response);

    return userData;
  }
);

// TODO API call here /api/v1/auth/impersonate
export const impersonate = createAsyncThunk(
  'common/impersonate',
  async (payload: any) => {
    const response = await loginAsApi(payload);
    const userData = await setUserDataToLocalStore(response);
    return userData;
  }
);

// TODO API call here /api/v1/auth/impersonate
export const origialToken = createAsyncThunk(
  'common/origialToken',
  async () => {
    const response = await getOriginalTokenApi();
    const userData = await setUserDataToLocalStore(response);
    return userData;
  }
);

export const selectCommon = ({ common }: any) => ({
  userData: common?.userData,
  afterLogin: common?.afterLogin,
  loggedInUserData: common?.loggedInUserData,
  authUserData: common?.authUserData
});

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearResults() {},
    setUserData: (state, action: any) => {
      state.userData = action.payload;
    },

    setAfterLoginFlag: (state) => {
      state.afterLogin = true;
    },

    //set logged in user data
    setLoggedInUserData: (state, action: any) => {
      state.loggedInUserData = action.payload;
    },
    //set auth user  data AWS account
    setAuthUserData: (state, action: any) => {
      state.authUserData = action.payload;
    },
    // set fusion One user
    setFusionOneUserData: (state, action: PayloadAction<string>) => {
      state.fusion1 = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(tokenExchange.pending, (state) => {
        state.loading = true;
      })
      .addCase(tokenExchange.fulfilled, (state: any, action) => {
        state.loading = false;
        if (action.payload) {
          state.userData = action.payload;
        }
      })
      .addCase(tokenExchange.rejected, (state) => {
        state.loading = false;
      })
      .addCase(impersonate.pending, (state) => {
        state.loading = true;
      })
      .addCase(impersonate.fulfilled, (state: any, action) => {
        state.loading = false;
        if (action.payload) {
          state.userData = action.payload;
          state.afterLogin = false;
        }
      })
      .addCase(impersonate.rejected, (state) => {
        state.loading = false;
        showErrorMessage('Organization onboarding not completed', {
          position: 'top-right'
        });
      })
      .addCase(origialToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(origialToken.fulfilled, (state: any, action) => {
        state.loading = false;
        if (action.payload) {
          state.userData = action.payload;
          state.afterLogin = false;
        }
      })
      .addCase(origialToken.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const {
  clearResults,
  setUserData,
  setAfterLoginFlag,
  setLoggedInUserData,
  setAuthUserData,
  setFusionOneUserData
} = commonSlice.actions;
export default commonSlice.reducer;
