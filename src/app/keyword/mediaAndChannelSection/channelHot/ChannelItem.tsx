import { Image } from "@nextui-org/react";
import React from "react";
import "./style.css";
import { Config } from "@/core/constants/configs";

export default function ChannelItem({ item, index }: any) {
  const tempImage = `${Config.API_SERVER}/images/services/other.png`;

  return (
    <div
      key={index}
      style={{
        borderBottom: "10px solid var(--Primary-200, #FFD5A5)",
      }}
      className="flex bg-[#fff] p-[24px] rounded-[12px] gap-2"
    >
      <Image className="channel-hot-avatar" src={tempImage} />
      <div className="flex flex-col justify-center gap-2 text-[12px] leading-[14px]">
        <p className="text-[#979C9E]">{item.name}</p>
        <p className="text-[#FF5247]">{item.platform}</p>
      </div>
    </div>
  );
}
