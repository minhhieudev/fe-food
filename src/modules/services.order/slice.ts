import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ServicesOrderState = {
  servicesOrder: any;
  notiList: any;
};

const initialState: ServicesOrderState = {
  servicesOrder: undefined,
  notiList: undefined,
};

const ServicesOrderSlice = createSlice({
  name: "serviceOrder",
  initialState,
  reducers: {
    order: (state: ServicesOrderState, { payload }: PayloadAction<any>) => {},
    getOrderList: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    gets: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    getSummary: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    getChannelInfo: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    getOrderStatus: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    getOrderById: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    getNotiList: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    searchOrder: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {},
    setServiceOrders: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {
      state.servicesOrder = payload;
    },
    setNotiList: (
      state: ServicesOrderState,
      { payload }: PayloadAction<any>
    ) => {
      state.notiList = payload;
    },
    genCMT: (state: ServicesOrderState, { payload }: PayloadAction<any>) => {},
  },
});

const ServiceOrderReducer = ServicesOrderSlice.reducer;
export default ServiceOrderReducer;

export const ServiceOrderActions = ServicesOrderSlice.actions;

export const ServiceOrderSelectors = {
  serviceOrder: (state: RootState) => state.serviceOrder.servicesOrder?.data,
  notiList: (state: RootState) => state.serviceOrder?.notiList,
};
