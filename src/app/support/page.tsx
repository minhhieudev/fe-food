"use client";

import React, { useEffect } from "react";
import { SVGFB, SVGSystem, SVGTele, SVGZalo } from "../asset/svgs";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { SettingActions, SettingSelectors } from "@/modules/setting/slice";
import { useAppDispatch } from "@/core/services/hook";
import { useSelector } from "react-redux";
import ShowTitle from "../components/ShowTitle";
import { Language } from "../utils/language/language";
import SupportInformation from "./SupportInformation";

export default function Support() {
  const lang = new Language(window);
  return (
    <>
      <ShowTitle title={lang.gen("menu.support")} />
      <div className=" text-[18px] font-bold flex flex-col border-1 border-gray-300 rounded-[12px] m-[24px] p-[20px] gap-[20px] max-lg:hidden">
        <p className="">Hỗ trợ trực tiếp</p>
        <SupportInformation flag={2} />{" "}
      </div>

      {/*========================== RESPONSIVE =============================*/}
      <div className="m-[24px] p-[20px] text-[18px] font-bold flex-col gap-[20px] hidden max-lg:flex">
        <p className="">Hỗ trợ trực tiếp</p>
        <SupportInformation flag={2} />{" "}
      </div>
      {/*========================== END =============================*/}
    </>
  );
}
