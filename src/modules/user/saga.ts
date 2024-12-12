import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { UserActions } from "./slice";
import { toast } from "react-toastify";
import { AppAction } from "@/core/components/AppSlice";
import { UserRequest } from "./request";
import SysStorage from "@/core/services/storage";

function* updateProfile({ payload }: PayloadAction<any>) {

  const { contact, info, onSuccess = () => {} } = payload;
  try {
    yield put(AppAction.showLoading());
    const response: { success: boolean; message: string; data?: any } = 
      yield UserRequest.updateProfile({contact, info});
    
    if (response.success) {
      // Lấy thông tin user hiện tại từ storage
      const UserInfo = SysStorage("USER_INFO");
      const currentUserInfo = JSON.parse((yield UserInfo.get()) || "{}");
      
      // Cập nhật thông tin mới
      const updatedUserInfo = {
        ...currentUserInfo,
        info,
        contact
      };
      
      // Lưu lại vào storage
      yield UserInfo.set(JSON.stringify(updatedUserInfo));
      
      // Cập nhật state trong Redux
      yield put(UserActions.setProfile(updatedUserInfo));
      
      onSuccess();
    }
    yield put(AppAction.hideLoading());
  } catch (error) {
    yield put(AppAction.hideLoading());
    toast.error('Cập nhật thông tin thất bại');
  }
}

export default function* userSaga() {
  yield takeLatest(UserActions.updateProfile.type, updateProfile);
} 