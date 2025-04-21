import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { apiGet } from 'src/shared/utils/api-request';

export const fetchTour = createAsyncThunk(
  'tour/getTourComponent',
  async (params: { tour: string }) => {
    const res = await apiGet(APIEndPoint.tour.getTourComponent, {
      params: params
    });
    return res.data || [];
  }
);

export const fetchTourStatus = createAsyncThunk(
  'tour/getTourStatus',
  async ({ id, componentName }: { id: string; componentName: string }) => {
    const res = await apiGet(
      `${APIEndPoint.tour.tour}/${id}/${APIEndPoint.tour.status}`
    );
    const tour = {
      ...res.data,
      id,
      componentName
    };
    return tour;
  }
);
interface tourSliceType {
  tourComponents: any[];
  tourDetails: any;
}
let initialState: tourSliceType = {
  tourComponents: [],
  tourDetails: {
    tourDetails: [],
    tourStatus: 'completed',
    id: '',
    componentName: ''
  }
};
const tourSlice = createSlice({
  name: 'tour',
  initialState: initialState,
  reducers: {
    setTourComponents: (state, action) => {
      state.tourComponents = action.payload;
    },
    setComponentTour: (state, action: any) => {
      state.tourDetails = action.payload;
    },
    setTourStatus: (state, action) => {
      state.tourDetails.tourStatus = action.payload;
    },
    setTourSteps: (state, action) => {
      state.tourDetails.tourDetails = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTour.fulfilled, (state, action) => {
      state.tourComponents = action.payload;
    });
    builder.addCase(fetchTourStatus.fulfilled, (state, action) => {
      state.tourDetails = action.payload;
    });
  }
});

export const {
  setTourComponents,
  setComponentTour,
  setTourStatus,
  setTourSteps
} = tourSlice.actions;
export default tourSlice.reducer;
