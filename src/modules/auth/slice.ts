import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  loginInfo: any;
  registerUsername:string
  client: any;
};

const initialState: AuthState = {
  loginInfo: undefined,
  registerUsername: "",
  client: undefined,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state: AuthState, { payload }: PayloadAction<any>) => {},
    googleSignIn: (state: AuthState, { payload }: PayloadAction<any>) => {},
    changePassWord: (state: AuthState, { payload }: PayloadAction<any>) => {},
    register: (state: AuthState, { payload }: PayloadAction<any>) => {},
    setLoginInfo: (state: AuthState, { payload }: PayloadAction<any>) => {
      state.loginInfo = payload;
    },
    getMenuService: (state: AuthState, { payload }: PayloadAction<any>) => {},
    sendMail: (state: AuthState, { payload }: PayloadAction<any>) => {},
    verifyOtp: (state: AuthState, { payload }: PayloadAction<any>) => {},
    updatePassword: (state: AuthState, { payload }: PayloadAction<any>) => {},
    getApiKey: (state: AuthState, { payload }: PayloadAction<any>) => {},
    getCurrentApiKey: (state: AuthState, { payload }: PayloadAction<any>) => {},
    setRegisterUsername: (state:any, { payload }:any) => {
      state.registerUsername = payload;
    },
    checkBioLink: (state, { payload }) => {},
    setClient: (state, { payload }) => {
      state.client = payload;
    },
    getClient: (state: AuthState, { payload }: PayloadAction<any>) => {},
  },
});

const AuthReducer = AuthSlice.reducer;
export default AuthReducer;

export const AuthActions = AuthSlice.actions;

export const AuthSelectors = {
  loginInfo: (state: RootState) => state.auth.loginInfo,
  registerUsername: (state:any) => state.auth.registerUsername,
  client: (state: RootState) => state.auth.client,
};
