"use client";
import React, { useEffect, useState } from "react";
import DropDownPickLanguage from "../components/DropDownPickLanguage";
import DropDownPickUnit from "../components/DropDownPickUnit";
import { SVGBell, SVGSmallLogo } from "../asset/svgs";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import ContainerMenu from "./ContainerMenu";
import { motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import User from "../components/MainScreen/User";
import { PaymentActions, PaymentSelectors } from "@/modules/payment/slice";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "../components/Notifications";
import { usePathname } from "next/navigation";
import { Language } from "../utils/language/language";

export default function Header() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenResponsive, setIsOpenResponsive] = useState(false);
  const dataWallet = useSelector(PaymentSelectors.wallet);
  const pathName = usePathname();
  const [pathNameChange, setPathNameChange] = useState<any>();
  const [isOpenClose,setIsOpenClose ] = useState<boolean>(false)

  const lang = new Language(window);

  useEffect(() => {
    setPathNameChange(pathName);
  }, [pathName]);
  useEffect(() => {
    dispatch(PaymentActions.getWallet({}));
  }, []);
  const toggleOpen = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div className="hidden max-lg:flex justify-between w-[100%] p-[12px] bg-[#F2F4F5] t-[0px]">
        <div className="flex gap-[5px] justify-center items-center">
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="item-center pt-1 lg:block hidden"
          >
            <MenuToggle toggle={() => toggleOpen()} />
          </motion.div>
          <div className="lg:hidden">
            <Popover
              radius="none"
              placement="top-start"
              backdrop="opaque"
              className="h-[800px] relative "
              shouldBlockScroll={true}
              isOpen= {isOpenClose}
              onClose={() => {
                setIsOpenClose(false)
                setIsOpenResponsive(false);
              }}
            >
              <PopoverTrigger>
                <QueueListIcon
                  color="#FF8900"
                  width={31}
                  className="cursor-pointer"
                  onClick = {()=>{setIsOpenClose(true)}}
                />
              </PopoverTrigger>
              <PopoverContent className="bg-[#fff] justify-normal flex mt-[-53px] pb-[53px] ml-[-15px] w-full">
                <ContainerMenu isOpenClose = {isOpenClose} setIsOpenClose= {setIsOpenClose}/>
              </PopoverContent>
            </Popover>
          </div>
          <SVGSmallLogo />
        </div>
        <div className="flex gap-[5px] ">
          <DropDownPickLanguage />
          <DropDownPickUnit balance={dataWallet?.data?.wallet?.balance} />
          <Notifications />
        </div>
      </div>
    </div>
  );
}
