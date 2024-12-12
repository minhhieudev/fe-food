import React from "react";
import {
  SVGFB,
  SVGLogoKeyWord,
  SVGTele,
  SVGWhatApp,
  SVGYoutube,
  SVGZalo,
} from "../../asset/svgs";

export default function FooterKeyWord() {
  const iconPlatform = [
    {
      icon: <SVGFB width={32} height={32} />,
    },
    {
      icon: <SVGYoutube width={32} height={32} />,
    },
    {
      icon: <SVGWhatApp width={32} />,
    },
    {
      icon: <SVGZalo width={32} />,
    },
    {
      icon: <SVGTele width={28} />,
    },
  ];
  return (
    <div className="max-sm:rounded-[0px] rounded-[24px] flex flex-col bg-[#fff] w-full h-[400px] my-[100px] p-[24px]">
      <div className="flex max-sm:flex-col justify-between items-center border-b-1 border-gray-300 pb-1 pt-6 max-sm:items-start max-sm:pt-1 max-sm:gap-2">
        <SVGLogoKeyWord />
        <div className="flex gap-[30px] items-center">
          {iconPlatform.map((item: any, index: number) => {
            return <div key={index}>{item.icon}</div>;
          })}
        </div>
      </div>
      <div className="py-[24px] flex flex-col gap-6">
        <div className="flex gap-2">
          <span className="text-[#72777A]">Email:</span>
          <span>mst.system@gmail.com</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#72777A]">Hotline:</span>
          <span>0987654321</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#72777A]">Address:</span>
          <span>
            22TT7 Foresa 2 Street, Urban ecosystem Xuân Phương, Ha Noi city
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#72777A] text-[12px]">
            @2023 MST Company. All rights reserved. Privacy Policy{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
