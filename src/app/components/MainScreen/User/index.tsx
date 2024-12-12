import React from "react";
import { SVGIconUser, SVGChevronDown } from "@/app/asset/svgs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function User() {
  return (
    <div className="flex gap-[10px] cursor-pointer items-center justify-center border-1 border-gray-200 p-1 rounded-[4px]">
      <SVGIconUser />
      <p className=" font-medium text-[16px]">User name</p>
      <ChevronDownIcon width={12} />
    </div>
  );
}
