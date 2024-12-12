import { AppAction } from "@/core/components/AppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLeading } from "redux-saga/effects";
import { MealRequest } from "./request";
import { MealActions } from "./slice";
import { toast } from "react-toastify";

function* getMeals({ payload }: PayloadAction<any>) {
  const { id, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } = yield MealRequest.getMeals(id);
    yield put(AppAction.hideLoading());
    if (res.success) {
      yield put(MealActions.setMeals(res));
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* getDetail({ payload }: PayloadAction<any>) {
  const { id, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; data: any } = yield MealRequest.getDetail({ id });
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* createMeal({ payload }: PayloadAction<any>) {
  const { body, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } = yield MealRequest.createMeal(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* createMany({ payload }: PayloadAction<any>) {
  const { body, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } = yield MealRequest.createMany(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* updateFavoriteIngredients({ payload }: PayloadAction<any>) {
  const { body, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } = yield MealRequest.updateFavoriteIngredients(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* updateDeliveryTime({ payload }: PayloadAction<any>) {
  const { body, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } = yield MealRequest.updateDeliveryTime(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* addReview({ payload }: PayloadAction<any>) {
  const { body, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } = yield MealRequest.addReview(body);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

function* cancelMeal({ payload }: PayloadAction<any>) {
  const { mealID, onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const res: { success: boolean; message: any } = yield MealRequest.cancelMeal(mealID);
    yield put(AppAction.hideLoading());
    if (res.success) {
      onSuccess && onSuccess(res);
    } else {
      toast.error(res.message);
      onFail && onFail(res);
    }
  } catch (e) {
    yield put(AppAction.hideLoading());
    onFail && onFail(e);
  }
}

export function* MealSaga() {
  yield takeLeading(MealActions.getMeals, getMeals);
  yield takeLeading(MealActions.createMeal, createMeal);
  yield takeLeading(MealActions.getDetail, getDetail);
  yield takeLeading(MealActions.updateFavoriteIngredients, updateFavoriteIngredients);
  yield takeLeading(MealActions.updateDeliveryTime, updateDeliveryTime);
  yield takeLeading(MealActions.addReview, addReview);
  yield takeLeading(MealActions.cancelMeal, cancelMeal);
  yield takeLeading(MealActions.createMany, createMany);
}
