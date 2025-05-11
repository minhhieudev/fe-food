"use client";

import CONST from "@/core/services/const";
import SysStorage from "@/core/services/storage";
import { AuthSelectors } from "@/modules/auth/slice";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SVGLogoNavBar } from "../asset/svgs";
import { Language } from "../utils/language/language";

interface Props {
  listMenu?: any;
  setNamePath?: any;
  isOpenClose?: boolean;
  setIsOpenClose?: any;
}

const ContainerMenu: React.FC<Props> = ({ listMenu = [], setNamePath, isOpenClose, setIsOpenClose }) => {
  const [current, setCurrent] = useState();
  const router = useRouter();
  const [items, setItems] = useState<any>();
  const lang = new Language(window);
  const pathName = usePathname();

  const ListMenu = [
    {
      name: lang.gen("menu.orderFood"),
      icon: <Cog8ToothIcon className="w-5 h-5 font-bold" color="#979C9E" />,
      iconPick: <Cog8ToothIcon className="w-5 h-5 font-bold" />,
      path: "/orderFood",
    },
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
      {/* Desktop Menu - Horizontal Layout */}
      <div className="lg:flex hidden items-center space-x-2">
        {ListMenu.map((item, index) => (
          <div key={index} className="relative">
            <Button
              className={`
                transition-all duration-200 ease-in-out
                ${current === index 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                  : "bg-white hover:bg-gray-50 text-gray-600"
                }
                rounded-xl px-4 py-2
                transform hover:scale-[1.02] active:scale-[0.98]
              `}
              onClick={() => handleRouter(item, index)}
            >
              <div className="flex items-center gap-2">
                <div className={`
                  p-1.5 rounded-lg
                  ${current === index 
                    ? "bg-white/20" 
                    : "bg-gray-100"
                  }
                `}>
                  {current === index ? item?.iconPick : item?.icon}
                </div>

                <p className={`
                  font-semibold text-base whitespace-nowrap
                  ${current === index 
                    ? "text-white" 
                    : "text-gray-700"
                  }
                `}>
                  {item?.name}
                </p>
              </div>
            </Button>
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden p-4 gap-2 flex flex-col h-[95vh] bg-white">
        <SVGLogoNavBar className="w-[fit-content] mb-4" />
        
        <div className="flex-1 space-y-2">
          {ListMenu.map((item, index) => (
            <div key={index} className="relative">
              <Button
                className={`
                  w-full transition-all duration-200
                  ${current === index
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }
                  rounded-xl p-4
                `}
                onClick={() => handleRouterMini(item, index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-lg
                    ${current === index 
                      ? "bg-white/20" 
                      : "bg-white"
                    }
                  `}>
                    {current === index ? item?.iconPick : item?.icon}
                  </div>

                  <p className={`
                    font-semibold text-base
                    ${current === index 
                      ? "text-white" 
                      : "text-gray-700"
                    }
                  `}>
                    {item?.name}
                  </p>
                </div>
              </Button>
            </div>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800">
            {items?.avatar ? (
              <img
                src={items?.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-xl object-cover"
              />
            ) : (
              <img
                src="/logo.png"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-xl object-cover"
              />
            )}
            <p className="text-white flex-1 ml-2 font-medium truncate">
              {items?.email}
            </p>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowRightStartOnRectangleIcon
                className="w-6 h-6 text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerMenu;
