import InputText from "../inputText";
import "./style.css";
import ButtonText from "../buttonText";
import { useDispatch } from "react-redux";
import { AuthActions } from "@/modules/auth/slice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthRequest } from '../../../../modules/auth/request';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Config } from "../../../../core/constants/configs";


export default function FormVerifyOtp(prop) {
  const { clientData, tokenOtp } = prop;
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(tokenOtp);

  const onCheckOtp = async () => {
    const body = {
      otp,
      token: token,
      clientData
    }
    const res = await AuthRequest.checkOtp(body)
    if (res.success) {
      toast.success('Xác thực thành công')
      router.push(`${Config.ADMIN_URL}/verify-password?email=${encodeURIComponent(clientData.email)}`);
    }
    else {
      toast.error('Xác thực thất bại')
    }
  };

  const resendOTP = async () => {
    const body = {
      email: clientData.email
    }
    const res = await AuthRequest.register(body)
    if (res.success) {
      setToken(res.token)
      toast.success('Mã otp mới đã được gửi đến Email của bạn')
    } else {
      toast.error(`${res.error}`)
    }
  }


  return (
    <div className="flex items-center justify-center lg:min-h-screen md:min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-full lg:max-w-md md:max-w-md bio-link-container">
        <h1 className="text-2xl font-bold mb-4 text-center">Nhập mã OTP để xác minh</h1>
        <div className="mb-4 lg:w-[380px] w-full h-[56px] rounded-[4px] border border-[#000000] px-[18px] flex ">
          <div className="ml-[-10px]">
            <InputText
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              flag={1}
              type="text"
              label=""
              variants={"flat"}
              placeholder="Nhập otp ....."
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
          onClick={onCheckOtp}
        />
        <p className="font-bold text-blue-400 text-center hover:cursor-pointer mt-2" onClick={resendOTP}>Gửi lại OTP</p>
        <p className="mt-4 text-center">
          Bạn đã có tài khoản? <Link href='./login'><span className="text-blue-700 cursor-pointer">Đăng nhập</span></Link>
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
