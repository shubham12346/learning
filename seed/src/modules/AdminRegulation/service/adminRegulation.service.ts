import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getListOfRegulation,
  getRegulationTypeDropdown,
  getRegulatoryBodyType,
  getRegulatoryOrganizationBodyListForAdminRegulation,
  getRegulationsById
} from '../api/AdminRegulationApi';

import { RegulatoryOrganization, adminRegulationState } from '../model';
import { RegulatoryList } from 'src/modules/Regulations/model/RegulationsInterface';

const initialState: adminRegulationState = {
  regulatoryOrganization: [],
  regulationList: [],
  regulationListBasedOnOrganization: [],
  regulationDetail: undefined,
  regulationBody: '',
  regulationOrgDropdown: [],
  regulationTypeDropdown: [],
  regulationDetailLoading: false,
  regOrgLoading: false,
  regulationListLoading: false,
  regulationOrgDropdownLoader: false,
  regulationTypeDropdownLoader: false
};
export const REGULATION_LIST = 'REGULATION_LIST';
export const REGULATION_BODY = 'REGULATION_BODY';

export const fetchRegOrganizationListWithCount = createAsyncThunk(
  'evaluate/regulationOrganizationCount',
  async (regulationType?: string) => {
    const response = getRegulatoryOrganizationBodyListForAdminRegulation(
      regulationType
        ? {
            regulationEditType: regulationType
          }
        : ''
    );
    return response;
  }
);
export const fetchOrganizationDropdownOptions = createAsyncThunk(
  'evaluate/regulationOrganization',
  async () => {
    const res = getRegulatoryBodyType();
    return res;
  }
);
export const fetchRegulationList = createAsyncThunk(
  'evaluate/regulationList',
  async (regulationType?: string) => {
    const response = getListOfRegulation(
      regulationType
        ? {
            regulationEditType: regulationType
          }
        : ''
    );
    return response;
  }
);

export const fetchRegulationById = createAsyncThunk(
  'evaluate/regulationDetail',
  (regulationId: string) => {
    const response = getRegulationsById(regulationId);
    return response;
  }
);

export const fetchRegulationTypeList = createAsyncThunk(
  'evaluate/regulationTypeList',
  () => {
    const response = getRegulationTypeDropdown();
    return response;
  }
);

const adminRegulationSlice = createSlice({
  name: 'adminRegulation',
  initialState,
  reducers: {
    evaluateRegulation: (state, action) => {
      switch (action?.payload?.type) {
        case REGULATION_LIST:
          state.regulationListBasedOnOrganization = action.payload?.payload;
          break;
        case REGULATION_BODY:
          state.regulationBody = action.payload?.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegOrganizationListWithCount.pending, (state) => {
        state.regOrgLoading = true;
      })
      .addCase(
        fetchRegOrganizationListWithCount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.regulatoryOrganization =
            convertRegulatoryOrgResponseForRegulatoryListComponent(
              action?.payload
            );
          state.regOrgLoading = false;
        }
      )
      .addCase(
        fetchRegOrganizationListWithCount.rejected,
        (state) => {
          state.regOrgLoading = false;
        }
      )
      .addCase(fetchRegulationList.pending, (state) => {
        state.regulationListLoading = true;
      })
      .addCase(
        fetchRegulationList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.regulationList = action.payload.data;
        }
      )
      .addCase(
        fetchRegulationList.rejected,
        (state) => {
          state.regulationListLoading = false;
        }
      )
      .addCase(fetchRegulationById.pending, (state) => {
        state.regulationDetailLoading = true;
      })
      .addCase(
        fetchRegulationById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.regulationDetail = action.payload;
          state.regulationDetailLoading = false;
        }
      )
      .addCase(
        fetchRegulationById.rejected,
        (state) => {
          state.regulationDetailLoading = false;
        }
      )
      .addCase(fetchRegulationTypeList.pending, (state) => {
        state.regulationTypeDropdownLoader = false;
      })
      .addCase(
        fetchRegulationTypeList.fulfilled,
        (state, action: PayloadAction<any>) => {
          const sortedRegulations = action?.payload?.sort((a, b) => a?.displaySequence - b?.displaySequence);
          state.regulationTypeDropdown = sortedRegulations;
          state.regulationTypeDropdownLoader = false;
        }
      )
      .addCase(
        fetchRegulationTypeList.rejected,
        (state) => {
          state.regulationTypeDropdown = [];
          state.regulationTypeDropdownLoader = false;
        }
      )
      .addCase(
        fetchOrganizationDropdownOptions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.regulationOrgDropdown = action.payload;
        }
      );
  }
});

export const adminRegulation = adminRegulationSlice.reducer;
export default adminRegulationSlice;
export const { evaluateRegulation } = adminRegulationSlice.actions;

export const convertRegulatoryOrgResponseForRegulatoryListComponent = (
  response: RegulatoryOrganization[]
): RegulatoryList[] => {
  const updateResponse = response?.map((item) => {
    return {
      id: item.regulatoryBodyId,
      name: item.regulatoryBodyName,
      totalCount: item?.regulationCount
    };
  });
  return updateResponse || [];
};
