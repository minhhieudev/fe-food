"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import TextInput from "../components/InputText";
import { useAppDispatch } from "@/core/services/hook";
import { AuthActions } from "@/modules/auth/slice";
import { toast } from "react-toastify";
import ShowTitle from "../components/ShowTitle";
import { Language } from "../utils/language/language";
import SysStorage from "@/core/services/storage";
import TextInputRepair from "../components/inputTextRepair";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateFormChangePassWord } from "../utils/units";

type ChangePass = {
  oldPassword: string;
  newPassword?: string;
  checkNewPass?: string;
};

const defaultChangePassWordForm: ChangePass = {
  oldPassword: "",
  newPassword: "",
  checkNewPass: "",
};

export default function Config() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: defaultChangePassWordForm,
    resolver: yupResolver(validateFormChangePassWord),
  });

  const lang = new Language(window);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleUser = async () => {
    const user = SysStorage("USER_INFO");
    let userTake = await user.get();
    setUser(JSON.parse(userTake || "{}"));
  };
  useEffect(() => {
    handleUser();
  }, []);

  const onSubmit: SubmitHandler<any> = (data) => {
    dispatch(
      AuthActions.changePassWord({
        oldPassword: data.oldPassword || "",
        newPassword: data.newPassword || "",
        onSuccess: (rs: any) => {
          reset();
        },
        onFail: (rs: any) => {
          toast.error(rs);
        },
      })
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:block md:hidden sm:hidden config-show-title">
          <ShowTitle title={lang.gen("menu.config")} />
        </div>
        <div className="border-1 border-gray-300 rounded-[12px] p-[20px] m-[20px] config">
          <p>Bảo mật</p>
          <div className="flex w-full justify-between gap-[20px] config-under">
            <div className="p-[24px] lg:w-[50%] md:w-[60%] w-auto  flex flex-col gap-[20px]">
              <TextInputRepair
                label="Email"
                placeholder="Nhập liên kết"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <TextInputRepair
                label="Phone"
                placeholder="Nhập phone"
                value={phone}
                type="text"
                onChange={(e: any) => setPhone(e.target.value)}
              />
              <Button className="bg-[#FF8900] text-[#fff] w-[167px] rounded-[4px]">
                Bật bảo mật 2 bước
              </Button>
            </div>
            <div className="p-[24px] lg:w-[50%] md:w-[60%] w-auto  flex flex-col gap-[20px]">
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <TextInputRepair
                    {...field}
                    label="Mật khẩu cũ"
                    type="password"
                    placeholder="Nhập mật khẩu cũ"
                    search={field.value}
                    errorMessage={errors?.oldPassword?.message}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextInputRepair
                    {...field}
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    search={field.value}
                    errorMessage={errors?.newPassword?.message}
                  />
                )}
              />
              <Controller
                name="checkNewPass"
                control={control}
                render={({ field }) => (
                  <TextInputRepair
                    {...field}
                    label="Nhập lại mật khẩu mới"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    search={field.value}
                    errorMessage={errors?.checkNewPass?.message}
                  />
                )}
              />
              <Button
                className="bg-[#FF8900] text-[#fff] w-[167px] rounded-[4px]"
                onClick={handleSubmit(onSubmit)}
              >
                Thay đổi mật khẩu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
