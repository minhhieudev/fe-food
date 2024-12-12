import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ServicesPackageState = {
  servicesPackage: any;
  servicesPackageHot: any;
  servicesSearch: any;
  servicesPackagePick: any;
  serviceDetail: any
};

const initialState: ServicesPackageState = {
  servicesPackage: undefined,
  servicesPackageHot: undefined,
  servicesSearch: undefined,
  servicesPackagePick: undefined,
  serviceDetail:undefined
};

const ServicesPackageSlice = createSlice({
  name: "servicePackage",
  initialState,
  reducers: {
    getServicePackage: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {},
    getServicePackagePick: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {},
    getServicePackagePickOne: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {},
    getSearch: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {},
    setServicePackagesHot: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {
      state.servicesPackageHot = payload;
    },
    getDetail: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {},
    setDetail: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {
      state.serviceDetail = payload.data.servicePackage;

    },
    setServiceSearch: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {
      state.servicesSearch = payload;
    },
    getServicePackageHot: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {},
    setServicePackages: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {
      state.servicesPackage = payload;
    },
    setServicePackagePick: (
      state: ServicesPackageState,
      { payload }: PayloadAction<any>
    ) => {
      state.servicesPackagePick = payload;
    },
  },
});

const ServicePackageReducer = ServicesPackageSlice.reducer;
export default ServicePackageReducer;

export const ServicePackageActions = ServicesPackageSlice.actions;

export const ServicePackageSelectors = {
  servicePackage: (state: RootState) => state.servicePackage,
  servicePackageHot: (state: RootState) =>
    state.servicePackage.servicesPackageHot,
  serviceSearch: (state: RootState) => state.servicePackage.servicesSearch,
  serviceDetail: (state: RootState) => state.servicePackage.serviceDetail,
  serviceSearchPick: (state: RootState) =>
    state.servicePackage.servicesPackagePick,
};
