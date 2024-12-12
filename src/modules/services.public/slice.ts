import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ServicesPlatformState = {
  services: any;
  servicesList: any;
};

const initialState: ServicesPlatformState = {
  services: undefined,
  servicesList: undefined,
};

const ServicesPlatformSlice = createSlice({
  name: "serviceplatform",
  initialState,
  reducers: {
    getServicePlatform: (
      state: ServicesPlatformState,
      { payload }: PayloadAction<any>
    ) => {},
    getServicePlatformList: (
      state: ServicesPlatformState,
      { payload }: PayloadAction<any>
    ) => {},
    setServicePlatform: (
      state: ServicesPlatformState,
      { payload }: PayloadAction<any>
    ) => {
      state.services = payload;
    },
  },
});

const ServicePlatformReducer = ServicesPlatformSlice.reducer;
export default ServicePlatformReducer;

export const ServicePlatformActions = ServicesPlatformSlice.actions;

export const ServicePlatformSelectors = {
  servicePlatform: (state: RootState) => state.servicePlatform.services?.data,
};
