import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ServicesGroupState = {
  services: any;
};

const initialState: ServicesGroupState = {
  services: undefined,
};

const ServicesGroupSlice = createSlice({
  name: "servicegroup",
  initialState,
  reducers: {
    getServiceGroups: (
      state: ServicesGroupState,
      { payload }: PayloadAction<any>
    ) => {},
    setServiceGroups: (
      state: ServicesGroupState,
      { payload }: PayloadAction<any>
    ) => {
      state.services = payload;
    },
  },
});

const ServiceGroupReducer = ServicesGroupSlice.reducer;
export default ServiceGroupReducer;

export const ServiceGroupActions = ServicesGroupSlice.actions;

export const ServiceGroupSelectors = {
  serviceGroup: (state: RootState) => state.serviceGroup.services?.data,
};
