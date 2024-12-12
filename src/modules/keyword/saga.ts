import { AppAction } from "@/core/components/AppSlice";
import { KeywordActions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { takeLeading, put } from "redux-saga/effects";
import { KeywordRequest } from "./request";

function* getKeyFollowed({ payload }: PayloadAction<any>) {
  const {
    page = 1,
    pageSize = 20,
    search,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield KeywordRequest.getKeywordFollowed({ page, pageSize, search });
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(KeywordActions.setKeyFollowed(res.data));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getSuggestedKeywords({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield KeywordRequest.getSuggestedKeywords();
    yield put(AppAction.hideLoading());

    if (res.success) {
      yield put(KeywordActions.setKeyFollowed(res.data));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getKeyHot({ payload }: PayloadAction<any>) {
  const {
    topicID,
    page,
    pageSize,
    search,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield KeywordRequest.getKeywordHot({ topicID, page, pageSize, search });
    yield put(AppAction.hideLoading());

    if (res.success) {
      yield put(KeywordActions.setKeyHot(res.data));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getKeyHotCheck({ payload }: PayloadAction<any>) {
  const {
    topicID,
    page,
    pageSize,
    search,
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield KeywordRequest.getKeywordHotCheck({
        topicID,
        page,
        pageSize,
        search,
      });
    yield put(AppAction.hideLoading());

    if (res.success) {
      yield put(KeywordActions.setKeyHotCheck(res.data));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}
function* getKeyFollowedFirst({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield KeywordRequest.getKeywordFollowedFirst();
    yield put(AppAction.hideLoading());

    if (res.success) {
      yield put(KeywordActions.setKeyFollowedFirst(res.data));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* KeyWordSaga() {
  yield takeLeading(KeywordActions.getKeyFollowed, getKeyFollowed);
  yield takeLeading(KeywordActions.getKeyFollowed, getKeyFollowedFirst);
  yield takeLeading(KeywordActions.getKeyHot, getKeyHot);
  yield takeLeading(KeywordActions.getKeyHotCheck, getKeyHotCheck);
  yield takeLeading(KeywordActions.getSuggestedKeywords, getSuggestedKeywords);
}
