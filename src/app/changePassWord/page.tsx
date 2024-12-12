"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import TextInput from "../components/InputText";
import { AuthActions } from "@/modules/auth/slice";
import { useAppDispatch } from "@/core/services/hook";
export default function ChangePassWord() {
  const dispatch = useAppDispatch();
  const [passOld, setPassOld] = useState("");
  const [passNew, setPassNew] = useState("");
  const handleUpdatePass = () => {
    if (passOld && passOld) {
      dispatch(
        AuthActions.changePassWord({
          oldPassword: passOld,
          newPassword: passNew,
          onSuccess: (rs: any) => {
            setPassOld("");
            setPassNew("");
          },
        })
      );
    }
  };
  return (
    <div className="flex w-full p-10 justify-center">
      <div className="w-[400px] flex gap-2 flex-col justify-center items-center">
        <p className="text-[20px] font-bold">Đổi mật khẩu</p>
        <TextInput
          value={passOld}
          label="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          type="password"
          onChange={(e: any) => setPassOld(e.target.value)}
        />
        <TextInput
          value={passNew}
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          type="password"
          onChange={(e: any) => setPassNew(e?.target.value)}
        />
        <Button onPress={handleUpdatePass}>Xác nhận</Button>
      </div>
    </div>
  );
}
