import React, { useMemo, useState } from "react";
import { SVGPaypal, SVGUser } from "@/app/asset/svgs";
import TextInput from "@/app/components/InputText";
import TextInputWithPass from "@/app/components/InputTextWithPass";
import MstCheckbox from "@/app/components/CheckBox/MSTCheckBox";
import { Button } from "@nextui-org/react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import avatar from "../asset/images/User.png";
import Images from "@/app/asset";
import PayPalCheckBox from "@/app/components/CheckBox/PayPalCheckBox";
import Paypal from "./Paypal.jsx";
import { Language } from "../utils/language/language";

export default function FormPayment() {
  const lang = new Language(window);

  const [checkBox, setCheckBox] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [currentPay, setCurrentPay] = useState(0);
  const [getMoney, setGetMoney] = useState(false);
  const [amount, setAmount] = useState(0);
  const payList = [
    {
      id: 0,
      title: "Paypal Balance (USD)",
      icon: Images.paypal,
    },
    {
      id: 1,
      title: "Visa x-0210",
      icon: Images.visa,
    },
  ];
  const handleLogin = () => {
    setCheckLogin(true);
  };
  const handleDepoint = () => {
    setAmount(0);
  };

  return (
    <div>
      {!getMoney === true ? (
        <div className="flex p-[20px] border-1 border-gray-300 rounded-[12px] flex-col gap-3">
          <TextInput
            onChange={(e: any) => setAmount(e.target.value)}
            label={lang.gen("recharge.enterthemount")}
            type="number"
            endContent={<>USD</>}
            placeholder={lang.gen("recharge.enterthemount")}
            value = {amount}
          />
          <Paypal amount={amount} handleDepoint = {handleDepoint} />
        </div>
      ) : (
        <>
          {checkLogin == false ? (
            <div className="flex border-1 border-gray-200 rounded-[12px] justify-center p-[20px] flex-col items-center gap-[20px]">
              <SVGPaypal />
              <p>Pay with Paypal</p>
              <div className="w-[300px] flex flex-col gap-[20px]">
                <TextInput />
                <TextInputWithPass />
              </div>
              <div className="flex  w-[300px] gap-4 items-center">
                <MstCheckbox
                  isChecked={checkBox}
                  onChange={() => {
                    setCheckBox(!checkBox);
                  }}
                >
                  <MstCheckbox.Indicator></MstCheckbox.Indicator>
                </MstCheckbox>
                <p className="text-[#72777A] text-[14px]">
                  Stay logged in for faster checkout
                </p>
                <p className="border-1 border-[#2790C3] rounded-[20px] w-[26px] flex justify-center items-center text-[#2790C3]">
                  ?
                </p>
              </div>
              <Button
                className="w-[300px] bg-[#2790C3] text-[#fff] rounded-[4px]"
                onClick={handleLogin}
              >
                Log In
              </Button>
              <p className="text-[14px] text-[#2790C3] cursor-pointer">
                Having trouble logging in
              </p>
              <div className="flex justify-center items-center gap-2 w-[300px]">
                <div className="h-[1px] w-full bg-[black]"></div>
                <p className="text-gray-400">or</p>
                <div className="h-[1px] w-full bg-[black]"></div>
              </div>
              <Button className="w-[300px] rounded-[4px]">
                Pay with a Bank Account or Credit Card
              </Button>
            </div>
          ) : (
            <div className="flex border-1 border-gray-200 rounded-[12px] justify-center p-[20px] items-center gap-[20px] w-full">
              <div className="flex w-[45%] flex-col gap-3">
                <div className="flex justify-between border-b-2 pb-2">
                  <SVGPaypal />
                  <div className="flex justify-center items-center gap-1">
                    <ShoppingCartIcon width={24} />
                    <p> $37.00 USD</p>
                    <ChevronDownIcon width={24} className=" cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#090A0A] font-bold text-[16px] border-b-2 pb-2">
                  <Image src={avatar} alt="avatar" width={50} />
                  <p>User Name</p>
                </div>
                <div className="flex gap-[20px] text-[16px] flex-col">
                  <p>Choose a way to pay</p>
                  {payList?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <PayPalCheckBox
                          isChecked={currentPay == index ? true : false}
                          handleCheckBox={() => {
                            setCurrentPay(index);
                          }}
                        />
                        <Image
                          src={item?.icon}
                          alt="icon"
                          width={35}
                          height={20}
                        />
                        {item?.title}
                      </div>
                    );
                  })}
                  <p className="text-[#2790C3] text-[15px] cursor-pointer">
                    + Add a credit or debit card
                  </p>
                </div>
                <Button className="rounded-[4px] bg-[#2790C3] text-[#fff] text-[16px]">
                  Coutinue
                </Button>
              </div>
              <div className="flex w-full justify-center flex-col items-center">
                <Image src={Images.safe} alt="safe" width={166} height={177} />
                <p className=" font-bold text-[24px]">
                  PayPal is the safer, faster way to pay
                </p>
                <p>
                  no matter where you shop, we keep your financial information
                  secure
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
