import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SettingState = {
  setting: any;
  translateData: any
};

const initialState: SettingState = {
  setting: undefined,
  translateData: {}
};

const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getSetting: (state: SettingState, { payload }: PayloadAction<any>) => {},
    setSetting: (state: SettingState, { payload }: PayloadAction<any>) => {
      state.setting = payload;
    },
    getTranslateDate: (state: SettingState, { payload }: PayloadAction<any>) => {},
    setTranslateDate: (state: SettingState, { payload }: PayloadAction<any>) => {
      state.translateData = payload;
    },
  },
});

const SettingReducer = SettingSlice.reducer;
export default SettingReducer;

export const SettingActions = SettingSlice.actions;

export const SettingSelectors = {
  setting: (state: RootState) => state.setting,
};
