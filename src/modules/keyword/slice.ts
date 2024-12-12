import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type KeywordProps = {
  followed: any;
  followedFirst: any;
  keyHot: any;
  keyHotCheck: any;
};

const initialState: KeywordProps = {
  followed: undefined,
  followedFirst: undefined,
  keyHot: undefined,
  keyHotCheck: undefined,
};

const KeywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    getKeyFollowed: (
      state: KeywordProps,
      { payload }: PayloadAction<any>
    ) => {},
    getKeyHot: (state: KeywordProps, { payload }: PayloadAction<any>) => {},
    getKeyHotCheck: (
      state: KeywordProps,
      { payload }: PayloadAction<any>
    ) => {},
    getKeyFollowedFirst: (
      state: KeywordProps,
      { payload }: PayloadAction<any>
    ) => {},
    getSuggestedKeywords: (
      state: KeywordProps,
      { payload }: PayloadAction<any>
    ) => {},
    setKeyFollowed: (state: KeywordProps, { payload }: PayloadAction<any>) => {
      state.followed = payload;
    },
    setKeyHot: (state: KeywordProps, { payload }: PayloadAction<any>) => {
      state.keyHot = payload;
    },
    setKeyHotCheck: (state: KeywordProps, { payload }: PayloadAction<any>) => {
      state.keyHotCheck = payload;
    },
    setKeyFollowedFirst: (
      state: KeywordProps,
      { payload }: PayloadAction<any>
    ) => {
      state.followedFirst = payload;
    },
  },
});

const KeywordReducer = KeywordSlice.reducer;
export default KeywordReducer;

export const KeywordActions = KeywordSlice.actions;
export const KeywordSelectors = {
  keyFollowed: (state: RootState) => state.keyword.followed,
  keyFollowedFirst: (state: RootState) => state.keyword.followedFirst,
  keyHot: (state: RootState) => state.keyword.keyHot,
  keyHotCheck: (state: RootState) => state.keyword.keyHotCheck,
};
