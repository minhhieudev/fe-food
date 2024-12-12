import { SVGKeyWordMain } from "@/app/asset/svgs";
import React from "react";
import SearchTopTopics from "../searchTool";

export default function LeftTopTopics() {
  return (
    <div className="flex gap-5 flex-col justify-center lg:w-[40%] max-lg:rounded-[24px] max-lg:bg-[url('/bgTopics.png')] max-lg:w-full max-lg:p-[36px] max-lg:relative">
      <SVGKeyWordMain />
      <p className="text-[48px] max-lg:text-[32px] max-lg:font-medium  max-lg:w-full">
        Keyword research
      </p>
      <p className="text-[28px] max-lg:text-[12px] max-lg:font-medium">
        MST Keyword research
      </p>

      <div className="absolute z-10 w-full left-[0px] lg:bottom-[-37px] max-lg:bottom-[-22px] px-[50px] max-lg:px-[12px]">
        <SearchTopTopics classScale="relative flex w-full lg:h-[74px] max-lg:h-[44px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-[12px] bg-[#fff]" />
      </div>
    </div>
  );
}
