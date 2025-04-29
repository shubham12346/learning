import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getRegulatoryBodyType,
  getReviewedListOfRegulation,
  getReviewedRegulationsById,
  getReviewedRegulatoryOrganizationBodyListForAdminRegulation
} from '../api/AdminRegulationApi';
import { RegulationDetailType, RegulatoryOrganization, adminRegulationState } from '../model';
import { RegulatoryList } from 'src/modules/Regulations/model/RegulationsInterface';

const initialState: adminRegulationState = {
  regulatoryOrganization: [],
  regulationList: [],
  regulationListBasedOnOrganization: [],
  regulationDetail: {} as RegulationDetailType,
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
  'reviewed/regulationOrganizationCount',
  async () => {
    const response =
      getReviewedRegulatoryOrganizationBodyListForAdminRegulation();
    return response;
  }
);
export const fetchOrganizationDropdownOptions = createAsyncThunk(
  'reviewed/regulationOrganization',
  async () => {
    const res = getRegulatoryBodyType();
    return res;
  }
);
export const fetchRegulationList = createAsyncThunk(
  'reviewed/regulationList',
  async (regulationType?: string) => {
    const response = getReviewedListOfRegulation(
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
  'reviewed/regulationDetail',
  (regulationId: string) => {
    const response = getReviewedRegulationsById(regulationId);
    return response;
  }
);

const adminRegulationReviewedSlice = createSlice({
  name: 'adminRegulationReviewed',
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
      
      .addCase(
        fetchOrganizationDropdownOptions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.regulationOrgDropdown = action.payload;
        }
      );
  }
});

export const adminRegulationReviewed = adminRegulationReviewedSlice.reducer;
export default adminRegulationReviewedSlice;
export const { evaluateRegulation } = adminRegulationReviewedSlice.actions;

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
