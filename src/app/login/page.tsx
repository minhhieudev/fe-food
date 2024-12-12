"use client";
import React, { useCallback, useEffect } from "react";
import { AuthActions } from "@/modules/auth/slice";
import { useAppDispatch } from "@/core/services/hook";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import TextInput from "../components/InputText";
import { useState } from "react";
import Image from "next/image";
import logoMST from "../asset/images/mst-logo-white.png";
import {
  EyeIcon,
  EyeSlashIcon,
  QueueListIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import "./style.css";
import LoginGoogle from "./LoginGoogle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDownPickLanguage from "../components/DropDownPickLanguage";
import { Language } from "../utils/language/language";
import * as yup from "yup";
import { validateEmail } from "../utils/units";
import LeftLogoTitle from "./LeftLogoTitle/LeftLogo.Title";
import ItemPlatform from "./components/ItemPlatform";
import {
  SVGInstagram,
  SVGYoutube,
  SVGTwitter,
  SVGTiktok,
  SVGGoogle,
  SVGShopee,
  SVGFB,
} from "../asset/svgs";

import { ServicePlatformActions } from "@/modules/services.public/slice";
import url from "./image/images (20).jpg"
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
            window.location.href = "/order";
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
  // ==================================================================
  /*
   * Người viết : Đinh văn Thành
   * Ngày viết: 18-05-2024
   * Chức năng: Call api gửi mail lấy otp
   * Method : Post
   * Body: truyền email của người dùng nhập từ UI
   */
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
  /*
   * Người viết : Đinh văn Thành
   * Ngày viết: 18-05-2024
   * Chức năng: Call api lấy token
   * Method : Post
   * Body: truyền email của người dùng nhập từ UI từ trước và opt lấy từ mail của người dùng
   */
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
  /*
   * Người viết : Đinh văn Thành
   * Ngày viết: 18-05-2024
   * Chức năng: Call api đổi mật khẩu
   * Method : Post
   * Body: truyền token của người dùng khi xác thực opt thành công và password lấy từ người dùng nhập UI
   */
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
  /*
    Người viết: Đinh Văn Thành
    Ngày viết: 21-05-2024
    Chức năng: call xự kiện onchange Email
  */
  const handleOnchangeEmail = (event: any) => {
    if (event.target.value == "" || !validateEmail(event.target.value)) {
      setErrorEmail(lang.gen("login.error-email"));
    } else {
      setErrorEmail("");
    }
    setSendMail(event.target.value);
  };
  /*======================= END =================================*/
  /*
    Người viết: Đinh Văn Thành
    Ngày viết: 21-05-2024
    Chức năng: call xự kiện onchange Otp
  */
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
    <div className="flex items-center justify-center">
      <div className="bg-white lg:py-8 lg:px-[37px] w-full h-[100vh]">
        {/* header */}
        <div className="lg:flex w-full hidden rounded-full px-6 py-3 bg-white text-black font-bold  justify-between mb-[31px]">
          <div className="flex flex-row gap-[86px]">
            {/* <Image src={logoMST} alt="logo" className="w-[40px] h-[40px]" /> */}
            <p className="cursor-pointer text-[#FF8900] text-xl flex items-center">
              Healthy food
            </p>
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
                <UserIcon width={16} color="white" />
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
                <PopoverContent className="bg-[#201F1E] justify-normal flex h-full mt-[-3rem] ml-[-15px] overflow-y-hidden overflow-x-hidden w-[300px]">
                  <div className="flex flex-col gap-[40px] mt-10 w-full text-[#979C9E] px-3">
                    <p>{lang.gen("login.home-page")}</p>
                    <p>{lang.gen("login.product")}</p>
                    <p>{lang.gen("login.cooperate")}</p>
                    <p>{lang.gen("login.contact")}</p>
                    <p>{lang.gen("login.about-us")}</p>
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
          <div className="w-[50%] bg-white justify-center  flex py-[38px] max-lg:py-0 rounded-[24px] max-lg:rounded-0 max-lg:bg-[#000] max-lg:w-full max-lg:mt-9">
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
                        : "flex flex-col lg:w-[460px] w-full bg-white rounded-[20px] p-6 lg:px-[40px] lg:pt-[60px] lg:pb-[40px] justify-center items-center gap-[28px]"
                    }
                  >
                    <p className="text-[24px] font-bold text-[#FF8900]">
                      Healthy food
                    </p>
                    <p className="text-[24px] font-bold">
                      {lang.gen("login.log-in")}
                    </p>
                    <TextInput
                      label={lang.gen("login.input-account")}
                      placeholder={lang.gen("login.input-placeholder-account")}
                      value={username}
                      onChange={(e: any) => setUserName(e.target.value)}
                      errorMessage={errorUserName}
                    />
                    <TextInput
                      type={isShowPass ? "text" : "password"}
                      label={lang.gen("login.enter-password")}
                      placeholder={lang.gen("login.input-placeholder-password")}
                      value={pass}
                      errorMessage={errorPassword}
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
                    <div className="flex w-full justify-between">
                      <div className="flex">
                        <Checkbox />
                        <p className="text-[#979C9E]">
                          {lang.gen("login.remember-log-in")}
                        </p>
                      </div>
                      <p
                        className=" cursor-pointer text-[#FF8900] font-bold"
                        onClick={(e: any) => {
                          setFlagForgotPassword(true);
                          setFlagOtp(false);
                          setToken("");
                          setPass("");
                          setSendMail("");
                        }}
                      >
                        {lang.gen("login.forgot-password")}
                      </p>
                    </div>
                    <Button
                      className="w-full bg-[#FF8900] text-white font-bold"
                      onClick={handleLogin}
                    >
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
                      <div className="text-[#979C9E] w-[160px] text-center">
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
                        className=" cursor-pointer text-[#FF8900] font-bold"
                        onClick={() => {
                          setRegister(true);
                        }}
                      >
                        {lang.gen("login.log-in")}
                      </span>
                    </p>
                    <Button
                      className="w-full bg-[#FF8900] text-white font-bold p-4"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {lang.gen("login.sign-up")}
                    </Button>
                  </div>
                  <div className="flex flex-row gap-[24px] w-full justify-center items-center">
                    <div className="w-full bg-[#E3E5E5] h-[1px]"></div>
                    <div className="text-[#979C9E] w-[160px] text-center">
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
          <div className="max-lg:w-full flex justify-center items-center w-[80%]">
            <div className=" flex items-center justify-center w-full h-full ">
              <div className="grid grid-cols-3 gap-[15px] w-[70%] max-lg:hidden">
                <div className="flex flex-col gap-[10px] justify-center items-center">
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720538014/temp/images/r0l7i6i4ylyy9pmmmxja.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285048/temp/images/rzshbrq3wdde3gau6y2j.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285097/temp/images/jeho5vcsddamsxzaqrq2.jpg'} alt="" className="h-17 w-17" />
                </div>
                <div className="grid grid-rows-4 gap-[10px] justify-items-center items-center">
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285208/temp/images/kzhnr5kwqfrzjjztpdto.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285084/temp/images/cjjggj2h7huta3pjvkqq.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285145/temp/images/bvgyvkofkdkcvs2vkiol.jpg'} alt="" className="h-17 w-17" />
                </div>
                <div className="flex flex-col gap-[10px] justify-center items-center">
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285012/temp/images/knrlurzbxppmz0pyap7h.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                  <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720285156/temp/images/sn9rbczeghgi69v0f45b.jpg'} alt="" className="h-17 w-17" />
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 flex-col gap-4 hidden max-lg:flex justify-center items-center">
            <div className="grid grid-cols-3 gap-[10px]  ">
              <div className="grid grid-rows-3 gap-[10px] justify-items-center items-center">
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
              </div>
              <div className="grid grid-rows-4 gap-[10px] justify-items-center items-center">
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
              </div>
              <div className="grid grid-rows-3 gap-[10px] justify-items-center items-center">
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
                <img src={'https://res.cloudinary.com/dvxn12n91/image/upload/v1720284939/temp/images/upfm2x4ivktalopnk4oh.jpg'} alt="" className="h-17 w-17" />
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
