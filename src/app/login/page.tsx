"use client";
import { useAppDispatch } from "@/core/services/hook";
import { AuthActions } from "@/modules/auth/slice";
import {
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
  InformationCircleIcon,
  KeyIcon,
  LockClosedIcon,
  PhoneIcon,
  QueueListIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  UserIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import logoMST from "../asset/images/mst-logo-white.png";
import logo from "../asset/images/logo.png";
import {
  SVGFB,
  SVGInstagram,
  SVGTwitter
} from "../asset/svgs";
import DropDownPickLanguage from "../components/DropDownPickLanguage";
import TextInput from "../components/InputText";
import { Language } from "../utils/language/language";
import { validateEmail } from "../utils/units";
import LoginGoogle from "./LoginGoogle";
import "./style.css";

import Link from "next/link";

type Register = {
  email: string;
  passWord: string;
};
const defaultRegister: Register = {
  email: "",
  passWord: "",
};

export default function Login() {
  const lang = new Language(window);
  const validateFormRegister = yup.object({
    email: yup
      .string()
      .email(`${lang.gen("login.for-example")} example@gmail.com`)
      .required(lang.gen("login.email-vacant")),
    passWord: yup
      .string()
      .required(lang.gen("login.password-vacant"))
      .min(6, lang.gen("login.password-requires"))
      .max(52, lang.gen("login.password-requires")),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm<Register>({
    mode: "onChange",
    defaultValues: defaultRegister,
    resolver: yupResolver(validateFormRegister),
  });

  const dispatch = useAppDispatch();
  const [username, setUserName] = useState("");
  const [sendMail, setSendMail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [flagOtp, setFlagOtp] = useState<boolean>(false);
  const [pass, setPass] = useState("");
  const [register, setRegister] = useState(true);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [flagForgotPassword, setFlagForgotPassword] = useState(false);
  const [errorUserName, setErrorUserName] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorOtp, setErrorOtp] = useState<string>("");

  const handleLogin = () => {
    if (username == "") {
      setErrorUserName(lang.gen("login.error-account"));
    } else if (pass == "") {
      setErrorUserName("");
      setErrorPassword(lang.gen("login.error-password"));
    } else {
      setErrorUserName("");
      setErrorPassword("");
      dispatch(
        AuthActions.signIn({
          email: username,
          password: pass,
          onSuccess: (rs: any) => {
            window.location.href = "/orderFood";
          },
        })
      );
    }
  };
  const onSubmit: SubmitHandler<Register> = (data) => {
    dispatch(
      AuthActions.register({
        email: data.email,
        password: data.passWord,
        onSuccess: (rs: any) => {
          setRegister(true);
          resetField("email");
          resetField("passWord");
        },
        onafterprint: () => {
          resetField("email");
          resetField("passWord");
        },
      })
    );
  };
  
  const handleSendMail = async () => {
    if (sendMail != "" && validateEmail(sendMail)) {
      dispatch(
        AuthActions.sendMail({
          email: sendMail,
          onSuccess: (rs: any) => {
            if (rs) {
              setErrorEmail("");
              setFlagOtp(true);
            }
          },
          onFail: () => { },
        })
      );
    }
  };
  // ===================== END =======================
  
  const handleSendOtp = async () => {
    if (otp.length == 6) {
      dispatch(
        AuthActions.verifyOtp({
          email: sendMail,
          otp: otp,
          onSuccess: (rs: any) => {
            if (rs) {
              setErrorEmail("");
              setToken(rs);
            }
          },
          onFail: () => { },
        })
      );
    }
  };
  // ===================== END =======================
  
  const handleUpdatePassword = async () => {
    dispatch(
      AuthActions.updatePassword({
        token: token,
        password: pass,
        onSuccess: (rs: any) => {
          if (rs) {
            setFlagForgotPassword(false);
            setFlagOtp(false);
            setToken("");
            setPass("");
            setSendMail("");
            setIsShowPass(false);
          }
        },
        onFail: () => { },
      })
    );
  };
  // ===================== END =======================
  
  const handleOnchangeEmail = (event: any) => {
    if (event.target.value == "" || !validateEmail(event.target.value)) {
      setErrorEmail(lang.gen("login.error-email"));
    } else {
      setErrorEmail("");
    }
    setSendMail(event.target.value);
  };
  /*======================= END =================================*/
  
  const handleOnchangeOtp = (event: any) => {
    if (
      event.target.value == "" ||
      event.target.value.length > 6 ||
      event.target.value.length < 6
    ) {
      setErrorOtp(lang.gen("login.error-otp"));
    } else {
      setErrorOtp("");
    }
    setOtp(event.target.value);
  };
  /*======================= END =================================*/

  return (
    <div className="flex items-center justify-center max-w-[1440px] mx-auto min-h-screen ">
      <div className="bg-white/80 backdrop-blur-sm lg:py-2 lg:px-[37px] w-full mx-auto">
        {/* header */}
        <div className="lg:flex w-full hidden rounded-full px-6 py-3 bg-white text-black font-bold justify-between mb-0">
          <div className="flex flex-row gap-[86px]">
            <div className="flex items-center gap-2">
              <Image 
                src={logo} 
                alt="Healthy Food Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <p className="cursor-pointer text-[#FF8900] text-xl">
                Healthy food
              </p>
            </div>
            <div className="flex flex-row gap-[40px] my-auto ">
              <p className="cursor-pointer hover:text-[#FF8900]">
                {" "}
                {lang.gen("login.home-page")}
              </p>
              <p className="cursor-pointer hover:text-[#FF8900]">
                {" "}
                {lang.gen("login.product")}
              </p>
              <p className="cursor-pointer hover:text-[#FF8900]">
                {" "}
                {lang.gen("login.cooperate")}
              </p>
              <p className="cursor-pointer hover:text-[#FF8900]">
                {" "}
                {lang.gen("login.contact")}
              </p>
              <p className="cursor-pointer hover:text-[#FF8900]">
                {" "}
                {lang.gen("login.about-us")}
              </p>
            </div>
          </div>
          <div className="flex items-center ">
            <Link href={'./register'}>
              <Button
                className="flex rounded-full w-[140px] bg-[#FF8900] text-white font-bold mr-[24px]"
              // onClick={() => {
              //   setRegister(false);
              //   setFlagForgotPassword(false);
              //   setFlagOtp(false);
              //   setToken("");
              // }}
              >
                <UserIcon width={17} color="white" />
                {lang.gen("login.sign-up")}
              </Button>
            </Link>
            <DropDownPickLanguage textColor="black" />
          </div>
        </div>
        {/* mobile header */}
        <div className="lg:hidden flex justify-between w-full items-center h-[55px] bg-[#282828] px-3 fixed z-50">
          <div className="flex justify-between items-center">
            <div className="">
              <Popover
                radius="none"
                placement="bottom-start"
                backdrop="opaque"
                className="h-[100vh] relative"
                shouldBlockScroll={true}
              >
                <PopoverTrigger>
                  <QueueListIcon
                    className="mr-2 cursor-pointer"
                    width={45}
                    height={45}
                    color="white"
                  />
                </PopoverTrigger>
                <PopoverContent className="bg-white/95 backdrop-blur-sm justify-normal flex h-full mt-[-3.5rem] ml-[-15px] overflow-y-hidden overflow-x-hidden w-[300px] shadow-xl">
                  <div className="flex flex-col gap-[40px] mt-10 w-full text-black px-6">
                    <div className="flex items-center justify-center mb-4">
                      <Image 
                        src={logo} 
                        alt="Healthy Food Logo" 
                        width={120} 
                        height={40}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex items-center gap-3 hover:text-[#FF8900] transition-colors cursor-pointer">
                      <HomeIcon className="w-6 h-6" />
                      <p>{lang.gen("login.home-page")}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 hover:text-[#FF8900] transition-colors cursor-pointer">
                      <ShoppingBagIcon className="w-6 h-6" />
                      <p>{lang.gen("login.product")}</p>
                    </div>

                    <div className="flex items-center gap-3 hover:text-[#FF8900] transition-colors cursor-pointer">
                      <UserGroupIcon className="w-6 h-6" />
                      <p>{lang.gen("login.cooperate")}</p>
                    </div>

                    <div className="flex items-center gap-3 hover:text-[#FF8900] transition-colors cursor-pointer">
                      <PhoneIcon className="w-6 h-6" />
                      <p>{lang.gen("login.contact")}</p>
                    </div>

                    <div className="flex items-center gap-3 hover:text-[#FF8900] transition-colors cursor-pointer">
                      <InformationCircleIcon className="w-6 h-6" />
                      <p>{lang.gen("login.about-us")}</p>
                    </div>

                    <div className="w-full h-[1px] bg-gray-200"></div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-500">Follow us on</p>
                      <div className="flex gap-4">
                        <div className="cursor-pointer hover:opacity-80">
                          <SVGFB width={24} height={24} />
                        </div>
                        <div className="cursor-pointer hover:opacity-80">
                          <SVGInstagram width={24} height={24} />
                        </div>
                        <div className="cursor-pointer hover:opacity-80">
                          <SVGTwitter width={24} height={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Image src={logoMST} alt="logo" className="w-[30px] h-[30px]" />
          </div>
          <div className="flex items-center">
            <DropDownPickLanguage textColor="#fff" />
          </div>
        </div>
        {/* content */}
        <div className="lg:flex lg:flex-row lg:gap-[85px] bg-white lg:bg-opacity-0 justify-between w-full px-3">


          {/* content left */}
          {/* login card */}
          <div className="w-[50%] bg-white justify-center flex  max-lg:py-0 rounded-[24px] max-lg:rounded-0  max-lg:w-full max-lg:mt-9">
            <div className=" flex flex-col items-center justify-start lg:rounded-[24px] w-full max-lg:w-full h-full bg-red">
              {register ? (
                <>
                  <div
                    className={
                      (((flagForgotPassword && flagOtp == false) ||
                        (flagForgotPassword && flagOtp)) &&
                        token == "") ||
                        (((flagForgotPassword && flagOtp == false) ||
                          (flagForgotPassword && flagOtp)) &&
                          token != "")
                        ? "hidden"
                        : "flex flex-col lg:w-[460px] w-full bg-white rounded-[20px] p-6 lg:px-[40px] lg:pt-[60px] lg:pb-[40px] justify-center items-center gap-[28px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-8 h-8 text-[#FF8900]" />
                      <p className="text-[24px] font-bold text-[#FF8900]">
                        Healthy food
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-600" />
                      <p className="text-[24px] font-bold">
                        {lang.gen("login.log-in")}
                      </p>
                    </div>

                    <div className="w-full">
                      <TextInput
                        label={lang.gen("login.input-account")}
                        placeholder={lang.gen("login.input-placeholder-account")}
                        value={username}
                        onChange={(e: any) => setUserName(e.target.value)}
                        errorMessage={errorUserName}
                        startContent={
                          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                        }
                      />
                    </div>

                    <div className="w-full">
                      <TextInput
                        type={isShowPass ? "text" : "password"}
                        label={lang.gen("login.enter-password")}
                        placeholder={lang.gen("login.input-placeholder-password")}
                        value={pass}
                        errorMessage={errorPassword}
                        onChange={(e: any) => setPass(e.target.value)}
                        startContent={
                          <LockClosedIcon className="w-5 h-5 text-gray-400" />
                        }
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => setIsShowPass(!isShowPass)}
                          >
                            {isShowPass ? (
                              <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        }
                      />
                    </div>

                    <div className="flex w-full justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <p className="text-gray-500 hover:text-gray-700">
                          {lang.gen("login.remember-log-in")}
                        </p>
                      </div>
                      <p
                        className="cursor-pointer text-[#FF8900] font-bold hover:text-[#ff9d2f] transition-colors flex items-center gap-1"
                        onClick={() => {
                          setFlagForgotPassword(true);
                          setFlagOtp(false);
                          setToken("");
                          setPass("");
                          setSendMail("");
                        }}
                      >
                        <KeyIcon className="w-4 h-4" />
                        {lang.gen("login.forgot-password")}
                      </p>
                    </div>

                    <Button
                      className="w-full bg-[#FF8900] text-white font-bold hover:bg-[#ff9d2f] transition-colors flex items-center justify-center gap-2 py-6"
                      onClick={handleLogin}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      {lang.gen("login.log-in")}
                    </Button>

                    <p className="lg:hidden">
                      {lang.gen("login.not-account")}{" "}
                      <span
                        className="cursor-pointer text-[#FF8900] font-bold"
                        onClick={() => {
                          setRegister(false);
                        }}
                      >
                        {lang.gen("login.sign-up")}
                      </span>
                    </p>
                    <div className="flex flex-row gap-[24px] w-full justify-center items-center">
                      <div className="w-full bg-[#E3E5E5] h-[1px]"></div>
                      <div className="text-[#979C9E] w-[170px] text-center">
                        {lang.gen("login.or")}
                      </div>
                      <div className="w-full bg-[#E3E5E5] h-[1px]"></div>
                    </div>
                    <LoginGoogle />
                  </div>

                  {/* Email card */}
                  <div
                    className={
                      flagForgotPassword && flagOtp == false
                        ? "flex flex-col lg:w-[460px] w-full bg-white rounded-[20px] p-6 lg:px-[40px] lg:pt-[60px] lg:pb-[40px] justify-center items-center gap-[28px]"
                        : "hidden"
                    }
                  >
                    <p className="text-[24px] font-bold">
                      {lang.gen("login.enter-email")}
                    </p>
                    <TextInput
                      label={lang.gen("login.enter-email")}
                      placeholder={lang.gen("login.input-email")}
                      onChange={handleOnchangeEmail}
                      search={sendMail}
                      errorMessage={errorEmail}
                    />

                    <Button
                      className="w-full bg-[#FF8900] text-white font-bold"
                      onClick={handleSendMail}
                    >
                      {lang.gen("login.send-email")}
                    </Button>
                  </div>

                  {/*opt card */}
                  <div
                    className={
                      flagForgotPassword && flagOtp && token == ""
                        ? "flex flex-col lg:w-[460px] w-full bg-white rounded-[20px] p-6 lg:px-[40px] lg:pt-[60px] lg:pb-[40px] justify-center items-center gap-[28px]"
                        : "hidden"
                    }
                  >
                    <p className="text-[24px] font-bold">
                      {lang.gen("login.input-otp")}
                    </p>
                    <TextInput
                      label={lang.gen("login.input-otp")}
                      placeholder={lang.gen("login.input-otp")}
                      search={otp}
                      onChange={(e: any) => handleOnchangeOtp(e)}
                      errorMessage={errorOtp}
                    />

                    <Button
                      className="w-full bg-[#FF8900] text-white font-bold"
                      onClick={handleSendOtp}
                    >
                      {lang.gen("login.send-otp")}
                    </Button>
                  </div>

                  {/*new password card */}
                  <div
                    className={
                      flagForgotPassword && flagOtp && token != ""
                        ? "flex flex-col lg:w-[460px] w-full bg-white rounded-[20px] p-6 lg:px-[40px] lg:pt-[60px] lg:pb-[40px] justify-center items-center gap-[28px]"
                        : "hidden"
                    }
                  >
                    <p className="text-[24px] font-bold">
                      {lang.gen("login.input-new-password")}
                    </p>
                    <TextInput
                      type={isShowPass ? "text" : "password"}
                      label={lang.gen("login.input-new-password")}
                      placeholder={lang.gen("login.input-new-password")}
                      search={pass}
                      onChange={(e: any) => setPass(e.target.value)}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() => {
                            setIsShowPass(!isShowPass);
                          }}
                        >
                          {isShowPass ? (
                            <EyeIcon width={18} className="text-default-400 " />
                          ) : (
                            <EyeSlashIcon
                              width={18}
                              className="text-default-400"
                            />
                          )}
                        </button>
                      }
                    />
                    <Button
                      className="w-full bg-[#FF8900] text-white font-bold"
                      onClick={handleUpdatePassword}
                    >
                      {lang.gen("login.updata-password")}
                    </Button>
                  </div>
                </>
              ) : (
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col h-[572px] lg:w-[460px] w-full bg-white rounded-[20px] p-6 lg:px-[40px] lg:pt-[60px] lg:pb-[40px] items-center gap-[20px]">
                    <p className="text-[24px] font-bold">
                      {lang.gen("login.sign-up")}
                    </p>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextInput
                            {...field}
                            label={lang.gen("login.enter-email")}
                            placeholder={lang.gen(
                              "login.input-email-registration"
                            )}
                            errorMessage={errors?.email?.message}
                          />
                        );
                      }}
                    />
                    <Controller
                      name="passWord"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextInput
                            {...field}
                            type={isShowPass ? "text" : "password"}
                            label={lang.gen("login.input-password")}
                            placeholder={lang.gen("login.input-password")}
                            errorMessage={errors?.passWord?.message}
                            endContent={
                              <button
                                className="focus:outline-none"
                                type="button"
                                onClick={() => {
                                  setIsShowPass(!isShowPass);
                                }}
                              >
                                {isShowPass ? (
                                  <EyeIcon
                                    width={18}
                                    className="text-default-400 "
                                  />
                                ) : (
                                  <EyeSlashIcon
                                    width={18}
                                    className="text-default-400"
                                  />
                                )}
                              </button>
                            }
                          />
                        );
                      }}
                    />
                    <p>
                      {lang.gen("login.already-account")}{" "}
                      <span
                        className=" cursor-pointer text-emerald-600 font-bold"
                        onClick={() => {
                          setRegister(true);
                        }}
                      >
                        {lang.gen("login.log-in")}
                      </span>
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold p-4"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {lang.gen("login.sign-up")}
                    </Button>
                  </div>
                  <div className="flex flex-row gap-[24px] w-full justify-center items-center">
                    <div className="w-full bg-[#E3E5E5] h-[1px]"></div>
                    <div className="text-[#979C9E] w-[170px] text-center">
                      {lang.gen("login.or")}
                    </div>
                    <div className="w-full bg-[#E3E5E5] h-[1px]"></div>
                  </div>
                  <LoginGoogle />
                </form>
              )}
            </div>
          </div>

          {/* content  right */}
          <div className=" flex justify-center items-center mx-auto sm:w-[80%] mt-4 lg:mt-0">
            <div className=" flex items-center justify-center w-full h-full ">
              <div className="grid grid-cols-3 gap-[15px] w-[70%]">
                <div className="flex flex-col gap-[10px] justify-center items-center">
                  <img 
                    src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720538014/temp/images/r0l7i6i4ylyy9pmmmxja.jpg'} 
                    alt="" 
                    className="h-17 w-17 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105" 
                  />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285048/temp/images/rzshbrq3wdde3gau6y2j.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285097/temp/images/jeho5vcsddamsxzaqrq2.jpg'} alt="" className="h-17 w-17" />
                </div>
                <div className="grid grid-rows-4 gap-[10px] justify-items-center items-center">
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285208/temp/images/kzhnr5kwqfrzjjztpdto.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285084/temp/images/cjjggj2h7huta3pjvkqq.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285175/temp/images/bvgyvkofkdkcvs2vkiol.jpg'} alt="" className="h-17 w-17" />
                </div>
                <div className="flex flex-col gap-[10px] justify-center items-center">
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285012/temp/images/knrlurzbxppmz0pyap7h.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285156/temp/images/sn9rbczeghgi69v0f45b.jpg'} alt="" className="h-17 w-17" />
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
function usestate(): [any, any] {
  throw new Error("Function not implemented.");
}
