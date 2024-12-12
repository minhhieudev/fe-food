import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { PaymentRequest } from "./request";
import { PaymentActions } from "./slice";

function* getWallet({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield PaymentRequest.getWallet();
    if (res.success) {
      yield put(PaymentActions.setWallet(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getPaymentHistory({ payload }: PayloadAction<any>) {
  const {
    page,
    pageSize,
    fromDate,
    toDate,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield PaymentRequest.getPaymentHistory({
        page,
        pageSize,
        fromDate,
        toDate,
      });
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(PaymentActions.setPaymentHistory(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* recharge({ payload }: PayloadAction<any>) {
  const {
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
    body,
  } = payload;
  try {
    const res: { success: boolean; data: any } = yield PaymentRequest.recharge(
      body
    );
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getQrBank({ payload }: PayloadAction<any>) {
  const {
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
    numberMany,
  } = payload;
  try {
    const res: { success: boolean; data: any } = yield PaymentRequest.getQrBank(
      numberMany
    );
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* PaymentSaga() {
  yield takeLeading(PaymentActions.getWallet, getWallet);
  yield takeLeading(PaymentActions.getPaymentHistory, getPaymentHistory);
  yield takeLeading(PaymentActions.recharge, recharge);
  yield takeLeading(PaymentActions.getQrBank, getQrBank);
}
