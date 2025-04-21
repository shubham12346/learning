import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../models';

interface TransactionState {
  transactionData: string[];
  userData: UserData;
  loadingTransactionData: boolean;
}
const initialState: TransactionState = {
  transactionData: [],
  userData: null,
  loadingTransactionData: false
};

const getTransactionListInsert = (transactionList) => {
  return [
    ...transactionList.map((entry) => {
      return {
        id: entry.id,
        orderDetails: entry.orderDetails,
        orderDate: entry.orderDate,
        status: entry.status,
        orderID: entry.orderID,
        sourceName: entry.sourceName,
        sourceDesc: entry.sourceDesc,
        amountCrypto: entry.amountCrypto,
        amount: entry.amount,
        cryptoCurrency: entry.cryptoCurrency,
        currency: entry.currency
      };
    })
  ];
};

export const transactionSlice = createSlice({
  name: 'transactionData',
  initialState,
  reducers: {
    /*To do - Modify below action as per requirnment */
    addTransaction: (state: any) => {
      state.value += 1;
    },
    deleteTransaction: (state: any) => {
      state.value -= 1;
    }
  },

  extraReducers: (builder) => {}
});

export default transactionSlice.reducer;
