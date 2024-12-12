"use client";
import { QueueListIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { SVGLogoKeyWord, SVGSmallLogo } from "../../asset/svgs";
import DropDownPickLanguage from "../../components/DropDownPickLanguage";
import NotificationsKeyWord from "../../components/NotificationsKeyWord";

export default function HeaderKeyTool() {
  const [checkWidth, setCheckWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);

  return (
    <div className="flex justify-between p-6 bg-[#fff] items-center max-sm:p-[8px]">
      <div className="flex w-[55%] justify-between max:sm:gap-2 max-sm:justify-start max-sm:items-center">
        <QueueListIcon
          width={45}
          height={45}
          className=" cursor-pointer max-sm:w-[32px] max-sm:h-[32px]"
        />
        <div className="max-sm:hidden">
          <SVGLogoKeyWord />
        </div>
        <div className="max-sm:flex hidden">
          <SVGSmallLogo />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <DropDownPickLanguage />
        <NotificationsKeyWord />
        <UserCircleIcon color="black" width={30} widths={30} />
      </div>
    </div>
  );
}
