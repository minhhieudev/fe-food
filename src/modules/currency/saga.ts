import { put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { CurrencyActions, CurrencySelector } from "./slice";
import CurrencyRequest from "./request";
import { PayloadAction, current } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { AuthActions, AuthSelectors } from "../auth/slice";

function* CurrencySaga() {
  yield takeLeading(CurrencyActions.getCurrencies, getCurrencies);
  yield takeLeading(CurrencyActions.setCurrency, setCurrency);
  yield takeLatest(CurrencyActions.getDetail, getDetail);
}
export default CurrencySaga;

function* getDetail({ payload }: PayloadAction<any>) {
  try {
    const rs: {
      data: any;
    } = yield CurrencyRequest.getDetail();

    if (!isEmpty(rs?.data)) {
      yield put(CurrencyActions.setCurrencyState(rs?.data));
    }
  } catch (error) {}
}

function* setCurrency({ payload }: PayloadAction<any>) {
  try {
    const loginInfo = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    const { onSuccess, item } = payload;    
    const rs: {
      success: any;
    } = yield CurrencyRequest.setCurrency(item);
    if (rs?.success) {
      yield put(CurrencyActions.setCurrencyState(item));
      localStorage.setItem(
        "USER_INFO",
        JSON.stringify({
          ...loginInfo,
          currency: item._id,
          currencyEditedVersion: item, // Lưu lại thông tin của loại tiền tệ xuống local Storage - Người viết: Đinh văn Thành - ngày viết: 27-05-2024
        })
      );

      onSuccess && onSuccess();
    }
  } catch (error) {}
}

function* getCurrencies({ payload }: PayloadAction<any>) {
  try {
    const { onSuccess } = payload;
    const rs: {
      data: any;
    } = yield CurrencyRequest.getCurrencies();
    if (!isEmpty(rs?.data)) {
      const loginInfo = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
      if(loginInfo && !loginInfo.currencyUsd){
        rs?.data.map((e:any)=>{
          if(e.code === 'USD'){
            localStorage.setItem(
              "USER_INFO",
              JSON.stringify({
                ...loginInfo,
                currencyUsd: {
                  "code": e.code,
                  "exchangeRate":e.exchangeRate
                }, // Lưu lại thông tin của loại tiền tệ Usd xuống local Storage - Người viết: Đinh văn Thành - ngày viết: 27-05-2024
              })
            );
          }
        })
      }
      onSuccess && onSuccess(rs?.data);
    }
  } catch (error) {}
}
