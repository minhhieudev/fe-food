import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeLeading } from "redux-saga/effects";
import { AuthRequest } from "./request";
import { AuthActions } from "./slice";
import SysStorage from "@/core/services/storage";
import CONST from "@/core/services/const";
import { get } from "lodash";
import { setConfigAxios } from "@/core/services/fetch";
import { toast } from "react-toastify";
export function* AuthSaga() {
  yield takeLeading(AuthActions.googleSignIn, googleSignIn);
  yield takeLeading(AuthActions.signIn, signIn);
  yield takeLeading(AuthActions.register, register);
  yield takeLeading(AuthActions.changePassWord, changePassWord);
  yield takeLeading(AuthActions.getMenuService, getMenuService);
  yield takeLeading(AuthActions.sendMail, sendMail);
  yield takeLeading(AuthActions.verifyOtp, verifyOtp);
  yield takeLeading(AuthActions.updatePassword, updatePassword);
  yield takeLeading(AuthActions.getApiKey, getApiKey);
  yield takeLeading(AuthActions.getCurrentApiKey, getCurrentApiKey);
  yield takeLeading(AuthActions.checkBioLink, checkBioLink);
  yield takeLeading(AuthActions.getClient, getClient);

}

/*
  Người viết: Dinh Văn Thành
  Ngày viết: 21-05-2024
  Chức năng: call api lấy ra key từ phiếu server trả về
*/
function* getApiKey({ payload }: PayloadAction<any>) {
  try {
    const { onSuccess } = payload;

    const rs: {
      success: boolean;
      data: any;
    } = yield AuthRequest.getApiKey();
    if (rs.success) {
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) { }
}
function* getCurrentApiKey({ payload }: PayloadAction<any>) {
  try {
    const { onSuccess } = payload;

    const rs: {
      success: boolean;
      data: any;
    } = yield AuthRequest.getCurrentApiKey();
    if (rs.success) {
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) { }
}
function* getMenuService({ payload }: PayloadAction<any>) {
  try {
    const { onSuccess } = payload;

    const rs: {
      success: boolean;
      data: any;
    } = yield AuthRequest.getMenuService();

    if (rs.success) {
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) { }
}

function* googleSignIn({ payload }: PayloadAction<any>) {
  const {
    googleToken,
    onSuccess = (rs: any) => { },
    onFail = (error: any) => { },
  } = payload;
  try {
    yield put(AppAction.showLoading());
    yield delay(500);
    const { success, message, data } = yield AuthRequest.loginGoogle(
      googleToken
    );

    yield put(AppAction.hideLoading());

    if (success) {
      //login success
      const atStorage = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
      const accessToken = get(data, "accessToken");
      yield atStorage.set(accessToken);

      //saved refresh token
      const refreshTokenStorage = SysStorage(CONST.STORAGE.REFRESH_TOKEN);
      const refreshToken = get(data, "refreshToken");
      yield refreshTokenStorage.set(refreshToken);

      const User = SysStorage(CONST.STORAGE.USER);
      const setUser = get(data, "customer.username");
      yield User.set(setUser);

      const UserInfo = SysStorage("USER_INFO");
      yield UserInfo.set(JSON.stringify(get(data, "customer") || {}));

      // yield put(AuthActions.setLoginInfo(data, "user"));
      toast.success("Đăng nhập thành công");
      setConfigAxios(accessToken);
      onSuccess && onSuccess();
    } else {
      onFail && onFail(`Tài khoản hoặc mật khẩu không đúng ${message}`);
    }
  } catch (e) { }
}

function* signIn({ payload }: PayloadAction<any>) {
  const {
    email,
    password,
    onSuccess = (rs: any) => { },
    onFail = (error: any) => { },
  } = payload;
  try {
    yield put(AppAction.showLoading());
    yield delay(500);
    const { success, message, data } = yield AuthRequest.login({
      email,
      password,
    });
    yield put(AppAction.hideLoading());
    if (success) {
      //login success
      const atStorage = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
      const accessToken = get(data, "accessToken");
      yield atStorage.set(accessToken);

      //saved refresh token
      const refreshTokenStorage = SysStorage(CONST.STORAGE.REFRESH_TOKEN);
      const refreshToken = get(data, "refreshToken");
      yield refreshTokenStorage.set(refreshToken);

      const User = SysStorage(CONST.STORAGE.USER);
      const setUser = get(data, "customer.username");
      yield User.set(setUser);

      const UserInfo = SysStorage("USER_INFO");
      yield UserInfo.set(JSON.stringify(get(data, "customer") || {}));

      // yield put(AuthActions.setLoginInfo(data, "user"));
      toast.success(message);
      setConfigAxios(accessToken);
      onSuccess && onSuccess();
    } else {
      toast.error(message);
      onFail && onFail(message);
    }
  } catch (e) { }
}
function* register({ payload }: PayloadAction<any>) {
  const {
    body,
    onSuccess = (rs: any) => { },
    onFail = (error: any) => { },
  } = payload;
  try {
    yield put(AppAction.showLoading());
    yield delay(500);
    const { success, message, data } = yield AuthRequest.register(
      body
    );
    yield put(AppAction.hideLoading());
    if (success) {
      toast.success(message);
      onSuccess && onSuccess(message);
    } else {
      toast.error(message);
      onFail && onFail(message);
    }
  } catch (e) { }
}
function* changePassWord({ payload }: PayloadAction<any>) {
  const {
    oldPassword,
    newPassword,
    onSuccess = (rs: any) => { },
    onFail = (error: any) => { },
  } = payload;
  try {
    yield put(AppAction.showLoading());
    yield delay(200);
    const { success, message, data } = yield AuthRequest.update({
      oldPassword,
      newPassword,
    });
    yield put(AppAction.hideLoading());
    if (success) {
      toast.success(message);
      onSuccess && onSuccess(success);
    } else {
      toast.error(message);
      onFail && onFail(`Tài khoản hoặc mật khẩu không đúng ${message}`);
    }
  } catch (e) { }
}
function* sendMail({ payload }: PayloadAction<any>) {
  const { email, onSuccess, onFail } = payload;
  try {
    yield put(AppAction.showLoading());
    const rs: { success: boolean; message: string } =
      yield AuthRequest.sendMail({ email });
    yield put(AppAction.hideLoading());
    if (rs.success == false) {
      toast.error(rs.message);
      onFail && onFail();
    } else {
      toast.success(rs.message);
      onSuccess && onSuccess(rs);
    }
  } catch (e) { }
}
function* verifyOtp({ payload }: PayloadAction<any>) {
  const { email, otp, onSuccess, onFail } = payload;
  try {
    yield put(AppAction.showLoading());
    const rs: { success: boolean; message: string; token: string } =
      yield AuthRequest.verifyOtp({ email, otp });
    yield put(AppAction.hideLoading());
    if (rs.success == false) {
      toast.error(rs.message);
      onFail && onFail();
    } else {
      toast.success(rs.message);
      onSuccess && onSuccess(rs.token);
    }
  } catch (e) { }
}
function* updatePassword({ payload }: PayloadAction<any>) {
  const { token, password, onSuccess, onFail } = payload;
  try {
    yield put(AppAction.showLoading());
    const rs: { success: boolean; message: string } =
      yield AuthRequest.updatePassword({ token, password });
    yield put(AppAction.hideLoading());
    if (rs.success == false) {
      toast.error(rs.message);
      onFail && onFail();
    } else {
      toast.success(rs.message);
      onSuccess && onSuccess(rs.success);
    }
  } catch (e) { }
}

function* checkBioLink({ payload }: any) {
  try {

    yield put(AppAction.showLoading());
    const rs: { success: boolean; message: string } =
      yield AuthRequest.checkBioLink({
        bioLink: payload.username,
      });
    yield put(AppAction.hideLoading());
    if (rs.success == false) {
      alert(rs.message);
    } else {
      yield put(AuthActions.setRegisterUsername(payload.username));
      payload.onSuccess && payload.onSuccess();
    }

  } catch (error) {
    console.log(error);
  }
}

function* getClient({ payload }: PayloadAction<any>) {
  try {
    const rs: { success: boolean; message: string, client: any } =
      yield AuthRequest.getClient({ clientCode: payload.clientCode });
    if (rs.success == false) {
      alert(rs.message);
    } else {
      localStorage.setItem('client_guid', rs.client.guid)
      yield put(AuthActions.setClient(rs.client));
      payload.onSuccess && payload.onSuccess(rs.client);
    }

  } catch (error) {
    console.log(error);
  }
}
