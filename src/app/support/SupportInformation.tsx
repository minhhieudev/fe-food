"use client";

import { useAppDispatch } from "@/core/services/hook";
import { SettingActions, SettingSelectors } from "@/modules/setting/slice";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SVGFB, SVGSystem, SVGTele, SVGZalo } from "../asset/svgs";

/*
  Người viết: Đinh văn thành
  Ngày viết: 29-05-2024
  Chức năng: Thêm biến flag vào trong prop của component, nhận biết xem có cần gọi api nhiều lần hay không
  VD: - nếu component cha đã gọi đến api rồi mà component con vẫn gọi lại thì để flag = 1 cho component con biết là component cha đã gọi api rồi
      - nếu component cha đã gọi đến api rồi mà component con vẫn gọi lại thì để flag = 2 cho component con biết là component cha chưa gọi api 
*/
interface Prop {
  flag: number
};
export default function SupportInformation(prop: Prop) {
  const {flag} = prop
  const dispatch = useAppDispatch();
  const dataSupport = useSelector(SettingSelectors.setting);
  useEffect(() => {
    if(flag !== 1) {
      dispatch(SettingActions.getSetting({}));
    }
  }, []);

  const dataCheck : Array<string> = [
    "systemName", "systemDescription", "isUseBank","isUsePerfectMoney",
    "isUsePaypal","depositDiscount", 
  ]

  const Items = [
    {
      title: "systemName",
      icon: <SVGSystem />,
    },
    {
      title: "zalo",
      icon: <SVGZalo />,
    },
    {
      title: "systemDescription",
      icon: <SVGSystem />,
    },
    {
      title: "facebook",
      icon: <SVGFB width={50} height={50} />,
    },
    {
      title: "telegram",
      icon: <SVGTele />,
    },
    {
      title: "phoneNumber",
      icon: <PhoneIcon color="#FF8900" width={50} />,
    },
  ];
  return (
    <>
      <div className="flex gap-36 w-full px-4 border-b-1 border-gray-300 pb-3 max-lg:hidden">
        {dataSupport?.setting?.data?.settings.map(
          (item: any, index: number) => {
            let checkValue = dataCheck.includes(item.key);
            if (checkValue === false && item.value !== "") {
              return (
                <div key={index} className="flex gap-3 cursor-pointer ">
                  {Items?.map((itemIcons: any) => {
                    if (itemIcons?.title === item.key) {
                      return <>{itemIcons?.icon}</>;
                    }
                  })}
                  <div className="flex flex-col justify-center">
                    <p className="text-[14px] font-normal">{item?.key}</p>
                    <p>{item?.value}</p>
                  </div>
                </div>
              );
            }
          }
        )}
      </div>
      {/*========================== RESPONSIVE =============================*/}
        {dataSupport?.setting?.data?.settings.map(
          (item: any, index: number) => {
            let checkValue = dataCheck.includes(item.key);
            if (checkValue === false && item.value !== "") {
              return (
                <div key={index} className="gap-3 cursor-pointer hidden max-lg:flex flex-nowrap border-1 border-gray-300 rounded-[12px] p-[20px] ">
                  {Items?.map((itemIcons: any) => {
                    if (itemIcons?.title === item.key) {
                      return <>{itemIcons?.icon}</>;
                    }
                  })}
                  <div className="flex flex-col justify-center">
                    <p className="text-[14px] font-normal">{item?.key}</p>
                    <p>{item?.value}</p>
                  </div>
                </div>
              );
            }
          }
        )}
      {/*================= END ===========================*/}
    </>
  );
}
