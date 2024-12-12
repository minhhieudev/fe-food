import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { IngredientTagRequest } from "./request";
import { IngredientTagActions } from "./slice";

function* getIngredientTag({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield IngredientTagRequest.getIngredientTag();
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(IngredientTagActions.setIngredientTag(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* IngredientTagSaga() {
  yield takeLeading(IngredientTagActions.getIngredientTag, getIngredientTag);
}
