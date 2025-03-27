"use client";

import CONST from "@/core/services/const";
import SysStorage from "@/core/services/storage";
import { AuthSelectors } from "@/modules/auth/slice";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  NewspaperIcon,
  PhoneIcon,
  QueueListIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../asset/images/avatar.jpg";
import { SVGLogoNavBar } from "../asset/svgs";
import { Language } from "../utils/language/language";
interface Props {
  listMenu?: any;
  setNamePath?: any;
  isOpenClose?: boolean;
  setIsOpenClose?: any;
}

const ContainerMenu: React.FC<Props> = ({ listMenu = [], setNamePath, isOpenClose, setIsOpenClose  }) => {
  const [current, setCurrent] = useState();
  const router = useRouter();
  const [items, setItems] = useState<any>();

  const lang = new Language(window);
  const pathName = usePathname();

  const ListMenu = [
    // {
    //   name: lang.gen("menu.statistical"),
    //   icon: <NewspaperIcon className="w-5 h-5 font-bold" color="#979C9E" />,
    //   iconPick: <NewspaperIcon className="w-5 h-5 font-bold" />,
    //   path: "/statistic",
    //   children: [],
    // },
    {
      name: lang.gen("menu.orderFood"),
      icon: <Cog8ToothIcon className="w-5 h-5 font-bold" color="#979C9E" />,
      iconPick: <Cog8ToothIcon className="w-5 h-5 font-bold" />,
      path: "/orderFood",
    },
    // {
    //   name: lang.gen("menu.order"),
    //   icon: <ShoppingCartIcon className="w-5 h-5 font-bold" color="#979C9E" />,
    //   iconPick: <ShoppingCartIcon className="w-5 h-5 font-bold" />,
    //   path: "/order",
    //   children: [],
    // },
    {
      name: lang.gen("menu.bought"),
      icon: <QueueListIcon className="w-5 h-5 font-bold" color="#979C9E" />,
      iconPick: <QueueListIcon className="w-5 h-5 font-bold" />,
      path: "/bought",
      children: [],
    },
    {
      name: lang.gen("menu.deposit"),
      icon: <CreditCardIcon className="w-5 h-5 font-bold" color="#979C9E" />,
      iconPick: <CreditCardIcon className="w-5 h-5 font-bold" />,
      path: "/payment",
    },
    // {
    //   name: lang.gen("menu.support"),
    //   icon: <PhoneIcon className="w-5 h-5 font-bold" color="#979C9E" />,
    //   iconPick: <PhoneIcon className="w-5 h-5 font-bold" />,
    //   path: "/support",
    // },
    // {
    //   name: lang.gen("menu.config"),
    //   icon: <Cog8ToothIcon className="w-5 h-5 font-bold" color="#979C9E" />,
    //   iconPick: <Cog8ToothIcon className="w-5 h-5 font-bold" />,
    //   path: "/config",
    // },
    // {
    //   name: lang.gen("menu.api"),
    //   icon: <Cog8ToothIcon className="w-5 h-5 font-bold" color="#979C9E" />,
    //   iconPick: <Cog8ToothIcon className="w-5 h-5 font-bold" />,
    //   path: "/api",
    // },
    {
      name: 'Thông tin',
      icon: <Cog8ToothIcon className="w-5 h-5 font-bold" color="#979C9E" />,
      iconPick: <Cog8ToothIcon className="w-5 h-5 font-bold" />,
      path: "/profile",
    },
    
  ];
  useEffect(() => {
    ListMenu.map((item: any, index: any) => {
      if (item.path === pathName) {
        setCurrent(index);
      }
    });
  }, [pathName]);

  useEffect(() => {
    if (pathName === "/") {
      router.replace("/orderFood");
    }
  }, []); 

  const handleRouter = (item: any, index: any) => {
    setCurrent(index);
    setNamePath(item);
    router.push(item?.path);
  };
  const handleRouterMini = (item: any, index: any) => {
    setIsOpenClose(!isOpenClose)
    setCurrent(index);
    router.push(item?.path);
  };
  const user = useSelector(AuthSelectors.loginInfo);

  const handleUser = async () => {
    const user = SysStorage("USER_INFO");
    let userTake = await user.get();
    setItems(JSON.parse(userTake || "{}"));
  };
  useEffect(() => {
    handleUser();
  }, []);

  const handleLogout = async () => {
    const tokenStorage = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
    const refreshtokenStorage = SysStorage(CONST.STORAGE.REFRESH_TOKEN);
    await tokenStorage.remove();
    await refreshtokenStorage.remove();

    window.location.href = "/login";
  };

  return (
    <>
      <div className="lg:flex hidden">
        {ListMenu.map((item, index) => {
          return (
            <div key={index}>
              <div className="px-2 pt-2 flex justify-center items-center p-1">
                <Button
                  className={
                    current == index
                      ? "w-full text-[#FF8900] bg-white underline mb-[4px] outline-none rounded-[10px] p-1"
                      : "w-full  bg-white mb-[4px] outline-none hover:rounded-[10px] p-1"
                  }
                  onClick={() => handleRouter(item, index)}
                >
                  <div className="w-full flex flex-1 items-center h-10 pl-1">
                    {/* {current == index ? item?.iconPick : item?.icon} */}
                    <p
                      className="pl-2 text-base font-bold"
                      style={{
                        color: current == index ? "" : "gray",
                        fontSize: 16,
                        lineHeight: 24,
                      }}
                    >
                      {item?.name}
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="lg:hidden p-[20px] gap-2 flex flex-col h-[95vh]">
        <SVGLogoNavBar className="w-[fit-content]" />
        {/* menu */}
        <div className="h-full">
          {ListMenu.map((item, index) => {
            return (
              <div key={index}>
                <div className="pt-2 flex justify-center items-center">
                  <Button
                    className={
                      current == index
                        ? "w-full bg-[#E3E5E5] outline-none p-1 px-2 py-6"
                        : "w-full outline-none p-1 bg-[#fff] px-2 py-6"
                    }
                    onClick={() => handleRouterMini(item, index)}
                  >
                    <div
                      className={
                        current == index
                          ? "w-full flex flex-1 items-center h-10 pl-2 bg-[#E3E5E5] rounded-[14px]"
                          : "w-full flex flex-1 items-center h-10 pl-2  rounded-[14px]"
                      }
                    >
                      {current == index ? item?.iconPick : item?.icon}
                      <p
                        className="pl-2 text-base font-bold"
                        style={{
                          color: current == index ? "" : "gray",
                          fontSize: 16,
                          lineHeight: 24,
                        }}
                      >
                        {item?.name}
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {/* User email */}
        <div className="flex items-center justify-between gap-1 h-[fit-content] px-6 py-[14px] rounded-lg bg-[black] mt-3">
          {items?.avatar ? (
            <img
              src={items?.avatar}
              alt="avatar"
              width={32}
              height={32}
              className=" rounded-2xl"
            />
          ) : (
            <img
              src={"/logo.png"}
              alt="avatar"
              width={32}
              height={32}
              className=" rounded-2xl"
            />
          )}
          <p className="text-[#fff] ml-[5px]">{items?.email}</p>
          <ArrowRightStartOnRectangleIcon
            color="#fff"
            width={36}
            className=" cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default ContainerMenu;
