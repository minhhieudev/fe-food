import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { ServicesOrderRequest } from "./request";
import { ServiceOrderActions } from "./slice";
import { toast } from "react-toastify";
function* order({ payload }: PayloadAction<any>) {
  const {
    body,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } =
      yield ServicesOrderRequest.order(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      toast.success("Đặt hàng thành công!");
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getOrderStatus({ payload }: PayloadAction<any>) {
  const {
    body,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.getOrderStatus(body);

    if (res?.success) {
      onSuccess && onSuccess(res?.data);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getOrderList({ payload }: PayloadAction<any>) {
  const {
    page,
    pageSize,
    name = "",
    status,
    scriptGroupCode,
    startDay,
    endDay,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.getOrderList({
        page,
        pageSize,
        name,
        status,
        scriptGroupCode,
        startDay,
        endDay,
      });
    yield put(AppAction.hideLoading());

    if (res?.success) {
      yield put(ServiceOrderActions.setServiceOrders(res));
      onSuccess && onSuccess(res?.data);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getOrderById({ payload }: PayloadAction<any>) {
  const { id, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.getOrderById({
        id,
      });
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getChannelInfo({ payload }: PayloadAction<any>) {
  const {
    body,
    setLoading,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    setLoading(true);
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.getChannelInfo(body);
    setLoading(false);
    if (res.success) {
      onSuccess && onSuccess(res?.data);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getNotiList({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.notiList();
    if (res.success) {
      yield put(ServiceOrderActions.setNotiList(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

function* genCMT({ payload }: PayloadAction<any>) {
  const {
    body,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.genCMT(body);

    yield put(AppAction.hideLoading());
    if (res?.success) {
      onSuccess && onSuccess(res?.data);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

function* gets({ payload }: PayloadAction<any>) {
  const { id, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.gets();
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

function* getSummary({ payload }: PayloadAction<any>) {
  const { body, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesOrderRequest.getSummary(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* ServicesOrderSaga() {
  yield takeLeading(ServiceOrderActions.order, order);
  yield takeLeading(ServiceOrderActions.getOrderList, getOrderList);
  yield takeLeading(ServiceOrderActions.getNotiList, getNotiList);
  yield takeLeading(ServiceOrderActions.getOrderById, getOrderById);
  yield takeLeading(ServiceOrderActions.getChannelInfo, getChannelInfo);
  yield takeLeading(ServiceOrderActions.genCMT, genCMT);
  yield takeLeading(ServiceOrderActions.getOrderStatus, getOrderStatus);
  yield takeLeading(ServiceOrderActions.getSummary, getSummary);
}
