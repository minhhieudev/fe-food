import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { SettingRequest } from "./request";
import { SettingActions } from "./slice";

function* getSetting({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield SettingRequest.getSettingByCustomer();
    yield put(AppAction.hideLoading());

    if (res.success) {
      yield put(SettingActions.setSetting(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getTranslateData({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield SettingRequest.getTranslateData();

    if (res.success) {
      yield put(SettingActions.setTranslateDate(res.data?.translateData));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* SettingSaga() {
  yield takeLeading(SettingActions.getSetting, getSetting);
  yield takeLeading(SettingActions.getTranslateDate, getTranslateData);
}
