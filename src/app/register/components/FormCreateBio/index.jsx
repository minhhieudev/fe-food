import InputText from "../inputText";
import "./style.css";
import ButtonText from "../buttonText";
import { useDispatch } from "react-redux";
import { AuthActions } from "@/modules/auth/slice";
import { useState } from "react";
import Link from "next/link";

export default function FormCreateBio(prop) {
  const { setStep } = prop;

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const onCheckBioLink = () => {
    dispatch(
      AuthActions.checkBioLink({
        username,
        onSuccess: () => {
          setStep?.(2);
        },
      })
    );
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen md:min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-full lg:max-w-md md:max-w-md bio-link-container">
        <h1 className="text-2xl font-bold mb-4 text-center">Tạo mới Bio Link</h1>
        <div className="mb-4 lg:w-[380px] w-full h-[56px] rounded-[4px] border border-[#000000] px-[18px] flex ">
          <p className="text-[#090A0A] text-[14px] leading-[20px] mt-[18px]">mst.com/</p>
          <div className="ml-[-10px]">
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        <ButtonText
          title="Tiếp tục"
          size={"lg"}
          radius={"sm"}
          color="primary"
          className={"w-full bio-link-container-button-child-one"}
          onClick={onCheckBioLink}
        />
        <p className="mt-4 text-center">
          Bạn đã có tài khoản? <Link href='./login'><span className="text-blue-500 cursor-pointer">Đăng nhập</span></Link>
        </p>
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
