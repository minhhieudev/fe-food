// pages/login.js

import ButtonText from "../buttonText";
import InputText from "../inputText";
import "./style.css";
import CheckBox from "@/components/checkBox";
import { useEffect, useState } from "react";
import { validateEmail } from "@/app/utils/validateEmail";
import { validatePassword } from "@/app/utils/validatePassword";
import { useDispatch } from "react-redux";
import { AuthActions } from "@/modules/auth/slice";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messagesEmail, setMessagesEmail] = useState("");
  const [messagesPassword, setMessagesPassword] = useState("");

  const handleSignIn = () => {
    if (_.isEmpty(email)) {
      setMessagesEmail("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (validateEmail(email) === null) {
      setMessagesEmail("Vui lòng nhập đúng định dạng email");
      return;
    }

    if (_.isEmpty(password)) {
      setMessagesPassword("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (validatePassword(password) === null) {
      setMessagesPassword("Mật khẩu yêu cầu trên 6 ký tự và không quá 24 ký tự");
    }

    dispatch(
      AuthActions.checkLogin({
        email,
        password,
        onSuccess: (bioLink) => {
          localStorage.setItem("BIO_LINK", bioLink);
          router.replace(`/bio/${bioLink}`);
        },
      })
    );
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen md:min-h-screen">
      <div className="login-container bg-white p-8 rounded-lg shadow-lg md:max-w-md lg:max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Đăng nhập</h1>
        <form>
          <div className="mb-4 login-container-div-child-one text-black">
            <InputText
              type="email"
              label="Email"
              placeholder="Nhập email"
              placement="outside"
              color={"default"}
              variants="bordered"
              radius="sm"
              isRequired={false}
              isInvalid={messagesEmail !== "" ? true : false}
              flag={1}
              errorMessage={messagesEmail}
              onChange={(e) => {
                setMessagesEmail("");
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4 login-container-div-child-two text-black">
            <InputText
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              placement="outside"
              color={"default"}
              variants="bordered"
              radius="sm"
              isRequired={false}
              isInvalid={messagesPassword !== "" ? true : false}
              errorMessage={messagesPassword}
              flag={2}
              onChange={(e) => {
                setMessagesPassword("");
                setPassword(e.target.value);
              }}
            />
          </div>
          <ButtonText
            className={"w-full h-[44px] bg-black text-white login-container-button-child-one "}
            size={"md"}
            title="Đăng nhập"
            radius={"sm"}
            onClick={() => {
              handleSignIn();
            }}
            isDisabled={messagesEmail === "" && messagesPassword === "" ? false : true}
          />
          <div
            role="button"
            className="text-blue-600 p-4 text-center cursor-pointer"
            onClick={() => {
              router.push("/register");
            }}
          >
            Đăng ký tài khoản
          </div>
          <div className="w-full h-[1px] border border-[#E3E5E5]"></div>
          <div className="flex items-center justify-between mt-2 login-container-footer">
            <div className="flex items-center mb-4">
              <div>
                <CheckBox />
              </div>
              <label htmlFor="remember" className="text-gray-700 mt-4">
                Nhớ tài khoản
              </label>
            </div>
            <a href="#" className="text-blue-500 hover:underline">
              Quên mật khẩu
            </a>
          </div>
        </form>
        <div className="w-full h-[1px] border border-[#E3E5E5] my-[20px]"></div>
        <p className="text-[12px] leading-[16px] font-normal text-gray-500 text-center">
          Bằng việc tiếp tục, bạn đã đồng ý với
          <span className="font-bold text-12px leading-[16px] text-[#6C7072]"> Điều khoản dịch vụ</span>
          của MST và xác nhận đã đọc và hiểu
          <span className="font-bold text-12px leading-[16px] text-[#6C7072]"> Chính sách về quyền riêng tư</span> của chúng tôi, cũng như
          bạn đã đủ 13 tuổi.
        </p>
      </div>
    </div>
  );
}
