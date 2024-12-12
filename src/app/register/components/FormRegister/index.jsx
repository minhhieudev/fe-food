import ButtonText from "../buttonText";
import InputText from "../inputText";
import "./style.css";
import { useSelector } from "react-redux";
import { AuthActions, AuthSelectors } from "@/modules/auth/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AuthRequest } from '../../../../modules/auth/request';
import { toast } from "react-toastify";

export default function FormRegister(prop) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setStep, onToken, onClientData } = prop;

  const registerUsername = useSelector(AuthSelectors.registerUsername);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const onRegister = async () => {
    const body = {
      email,
    }
    const clientData = {
      code: registerUsername,
      name:fullName,
      email,
    }
    const res = await AuthRequest.register(body)
    if (res.success) {
      onToken(res.token)
      onClientData(clientData)
      setStep(3)
      toast.success('Mã otp đã được gửi đến Email của bạn')
    } else {
      toast.error(`${res.error}`)
    }
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen md:min-h-screen">
      <div className="register-container bg-white p-8 rounded-lg shadow-lg md:max-w-md lg:max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Thông tin đăng ký</h1>
        <div className="mb-4 lg:w-[380px] w-full h-[56px] rounded-[4px] border border-[#000000] px-[18px] flex ">
          <p className="text-[#090A0A] text-[14px] leading-[20px] mt-[18px]">mst.com/</p>
          <div className="ml-[-10px]">
            <InputText
              disabled
              value={registerUsername}
              flag={1}
              type="text"
              label=""
              variants={"flat"}
              placeholder="username"
              radius={"none"}
              size={"md"}
            />
          </div>
        </div>
        <form>
          <div className="mb-4 register-container-div-child-one">
            <InputText
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              label="Tên"
              placeholder="Nhập tên"
              placement="outside"
              color={"default"}
              variants="bordered"
              radius="sm"
              isRequired={false}
              isInvalid={false}
              flag={1}
            />
          </div>
          <div className="mb-4 register-container-div-child-two">
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              placeholder="Nhập email"
              placement="outside"
              color={"default"}
              variants="bordered"
              radius="sm"
              isRequired={false}
              isInvalid={false}
              flag={1}
            />
          </div>
          {/* <div className="mb-4 register-container-div-child-three">
            <InputText
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              placement="outside"
              color={"default"}
              variants="bordered"
              radius="sm"
              isRequired={false}
              isInvalid={false}
              flag={2}
            />
          </div> */}
          <ButtonText
            onClick={onRegister}
            className={"w-full h-[44px] bg-black text-white register-container-button-child-one"}
            size={"md"}
            title="Đăng ký"
            radius={"sm"}
          />
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
