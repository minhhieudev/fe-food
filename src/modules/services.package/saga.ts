import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { ServicesPackageRequest } from "./request";
import { ServicePackageActions } from "./slice";
import { toast } from "react-toastify";

function* getServicePackage({ payload }: PayloadAction<any>) {
  const {
    platform = "",
    id = "",
    search = "",
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield ServicesPackageRequest.getServicePackage(platform, id, search);

    if (res.success) {
      yield put(ServicePackageActions.setServicePackages(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getServicePackagePick({ payload }: PayloadAction<any>) {
  const {
    platform = "",
    id = "",
    search = "",
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield ServicesPackageRequest.getServicePackagePick(platform, id, search);
    if (res.success) {
      yield put(
        ServicePackageActions.setServicePackagePick(res.data.servicePackages)
      );
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getServicePackagePickOne({ payload }: PayloadAction<any>) {
  const {
    platform = "",
    id = "",
    search = "",
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    const res: { success: boolean; data: any } =
      yield ServicesPackageRequest.getServicePackagePick(platform, id, search);

    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getSearch({ payload }: PayloadAction<any>) {
  const {
    search = "",
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any;message:string } =
      yield ServicesPackageRequest.getSearch(search);
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(ServicePackageActions.setServiceSearch(res));
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message)
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getServicePackageHot({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesPackageRequest.getServicePackageHot();
    yield put(AppAction.hideLoading());

    if (res.success) {
      yield put(ServicePackageActions.setServicePackagesHot(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

function* getDetail({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {},id } = payload;

  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield ServicesPackageRequest.getDetail(id);
    yield put(AppAction.hideLoading());

    if (res.success) {
      console.log('ee',res)
      yield put(ServicePackageActions.setDetail(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* ServicesPackageSaga() {
  yield takeLeading(
    ServicePackageActions.getServicePackageHot,
    getServicePackageHot
  );
  yield takeLeading(ServicePackageActions.getServicePackage, getServicePackage);
  yield takeLeading(
    ServicePackageActions.getServicePackagePick,
    getServicePackagePick
  );
  yield takeLeading(
    ServicePackageActions.getServicePackagePick,
    getServicePackagePickOne
  );
  yield takeLeading(ServicePackageActions.getSearch, getSearch);
  yield takeLeading(ServicePackageActions.getDetail, getDetail); 
}
