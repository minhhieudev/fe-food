import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currency: {
    code: "VND",
    exchangeRate: 1,
  },
};

const CurrencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    getCurrencies: (state, { payload }: PayloadAction<any>) => {},
    setCurrency: (state, { payload }: PayloadAction<any>) => {},
    getDetail: (state) => {},
    setCurrencyState: (state, { payload }: PayloadAction<any>) => {
      state.currency = payload;
    },
  },
});

const CurrencyReducer = CurrencySlice.reducer;
export default CurrencyReducer;

export const CurrencyActions = CurrencySlice.actions;

export const CurrencySelector = {
  currency: (state: RootState) => state.currency.currency,
};
