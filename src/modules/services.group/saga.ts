import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { ServicesGroupRequest } from "./request";
import { ServiceGroupActions } from "./slice";

function* getServiceGroups({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesGroupRequest.getServicesGroup();
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(ServiceGroupActions.setServiceGroups(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* ServicesGroupSaga() {
  yield takeLeading(ServiceGroupActions.getServiceGroups, getServiceGroups);
}
