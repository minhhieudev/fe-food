import React from "react";
import Image from "next/image";
import logoMSTOrange from "../../asset/images/orange-logo-mst.png";

export default function LeftLogoTitle() {
  return (
    <div className="gap-[40px] max-lg:gap-[20px] content-title-login flex flex-col w-full h-full md:mt-24 sm:mt-32 lg:mt-[30px] mt-[0px] items-center m-0">
      <div className="flex items-end text-white">
        <Image
          src={logoMSTOrange}
          alt="logo"
          className="w-[28px] h-[28px] mr-3"
        />
        <p className="">
          <b>MST</b> ENTERTAINMENT
        </p>
      </div>
      <div className="flex justify-center items-center w-full">
        <p className="text-white text-[32px] w-full text-center">
          Topclick.vn - Nền Tảng tăng tương tác MXH top 1
        </p>
      </div>

      <div className=" bg-white border-b-1 border-white w-[346px] max-lg:mb-5"></div>
    </div>
  );
}
