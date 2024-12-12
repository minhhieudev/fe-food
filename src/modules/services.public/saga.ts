import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { ServicesPlatformRequest } from "./request";
import { ServicePlatformActions } from "./slice";

function* getServicePlatform({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesPlatformRequest.getServicesPlatform();
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(ServicePlatformActions.setServicePlatform(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getServicePlatformList({ payload }: PayloadAction<any>) {
  const {
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
    platform = "youtube",
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesPlatformRequest.getServicesPlatformList({ platform });
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(ServicePlatformActions.setServicePlatform(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
export function* ServicesPlatformSaga() {
  yield takeLeading(
    ServicePlatformActions.getServicePlatform,
    getServicePlatform
  );
  yield takeLeading(
    ServicePlatformActions.getServicePlatformList,
    getServicePlatformList
  );
}
