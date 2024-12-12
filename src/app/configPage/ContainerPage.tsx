"use client";
import { useEffect, useState } from "react";
// import ContainerHeader from "./ContainerHeader";
import CONST from "@/core/services/const";
import SysStorage from "@/core/services/storage";
import { AuthSelectors } from "@/modules/auth/slice";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion, useCycle } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { SVGLogoImg } from "../asset/svgs";
import ContainerMenu from "./ContainerMenu";
import Header from "./Header";
import KeyWord from "../keyword/page";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PaymentSelectors } from "@/modules/payment/slice";
import DropDownPickLanguage from "../components/DropDownPickLanguage";
import DropDownPickUnit from "../components/DropDownPickUnit";
import Notifications from "../components/Notifications";
import ContainerMenuColumn from "./ContainerMenuColumn";

function ContainerPage({ children }: any) {
  const pathName = usePathname();
  const [namePath, setNamePath] = useState<any>();
  const dataWallet = useSelector(PaymentSelectors.wallet);
  const variants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "100%" },
  };
  const [isOpen, toggleOpen] = useCycle(true, false);
  const user = useSelector(AuthSelectors.loginInfo);

  const [items, setItems] = useState<any>();

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
    const user = SysStorage("USER_INFO");
    await tokenStorage.remove();
    await refreshtokenStorage.remove();
    await user.remove();

    window.location.href = "/login";
  };
  return pathName == "/login" ? (
    children
  ) : (
    <>
      {pathName === "/keyword" ? (
        <KeyWord />
      ) : (
        <div className="relative w-full">
          <div className="relative">
            <nav className="fixed w-full top-0 left-0 z-0">
              <div className="lg:block hidden lg:px-[24px]">
                <motion.div
                  className="w-[264px] overflow-hidden"
                  initial="visible"
                  animate={isOpen ? "visible" : "hidden"}
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="bg-white lg:flex items-center justify-between overflow-auto w-[280px] lg:rounded-none rounded-[12px] p-[8px]"
                    initial="visible"
                    animate={isOpen ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <SVGLogoImg />
                      <ContainerMenu setNamePath={setNamePath} />
                    </div>
                    {/* user */}
                    <div className="flex items-center">
                      <div className="flex items-center gap-[20px] mr-[20px]">
                        <DropDownPickLanguage />
                        <DropDownPickUnit
                          balance={dataWallet?.data?.wallet?.balance}
                        />
                        <Notifications />
                      </div>
                      <Popover
                        radius="none"
                        placement="bottom-start"
                        className="ml-4"
                        shouldBlockScroll={true}
                      >
                        <PopoverTrigger>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <p className="font-bold ml-2">{items?.email}</p>
                            <ChevronDownIcon color="gray" width={12} />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="rounded-md w-[230px] cursor-pointer"
                          onClick={handleLogout}
                        >
                          <div className="flex justify-between p-2 w-full">
                            <p className="mr-2">Đăng xuất</p>
                            <ArrowRightStartOnRectangleIcon
                              color="black"
                              width={24}
                              className=" cursor-pointer"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </nav>
            {/* content */}
            <div className="lg:flex lg:mx-6 lg:mt-[100px]">
              {/* <div className="w-1/5">
                <ContainerMenuColumn />
              </div> */}
              <div className="">
                <Header />
              </div>
              <div className="w-full px-2">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContainerPage;
