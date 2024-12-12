import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { IngredientGroupRequest } from "./request";
import { IngredientGroupActions } from "./slice";

function* getIngredientGroup({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } =
      yield IngredientGroupRequest.getIngredientGroup();
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(IngredientGroupActions.setIngredientGroup(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {}
}

export function* IngredientGroupSaga() {
  yield takeLeading(IngredientGroupActions.getIngredientGroup, getIngredientGroup);
}
 