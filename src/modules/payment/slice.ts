import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PaymentState = {
  payment: any;
  wallet: any;
  historyList: any;
};

const initialState: PaymentState = {
  payment: undefined,
  wallet: undefined,
  historyList: undefined,
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getWallet: (state: PaymentState, { payload }: PayloadAction<any>) => {},
    getPaymentHistory: (
      state: PaymentState,
      { payload }: PayloadAction<any>
    ) => {},
    setWallet: (state: PaymentState, { payload }: PayloadAction<any>) => {
      state.wallet = payload;
    },
    setPaymentHistory: (
      state: PaymentState,
      { payload }: PayloadAction<any>
    ) => {
      state.historyList = payload;
    },
    recharge: (state: PaymentState, { payload }: PayloadAction<any>) => {},
    getQrBank: (state: PaymentState, { payload }: PayloadAction<any>) => {},
  },
});

const PaymentReducer = PaymentSlice.reducer;
export default PaymentReducer;

export const PaymentActions = PaymentSlice.actions;

export const PaymentSelectors = {
  wallet: (state: RootState) => state.payment.wallet,
  history: (state: RootState) => state.payment.historyList,
};
