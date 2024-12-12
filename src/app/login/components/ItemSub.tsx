import React, { useEffect, useState } from "react";
import { SvgMore } from "@/app/asset/svgs";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import ItemSubMore from "./ItemSubMore";
import { ServicePlatformActions } from "@/modules/services.public/slice";
import { useAppDispatch } from "@/core/services/hook";
type Sub = {
  name: string;
};
interface Props {
  itemSub?: Sub;
  index: number;
  platform?: string;
}
export default function ItemSub(props: Props) {
  const { index, itemSub, platform } = props;
  const dispatch = useAppDispatch();
  const [more, setMore] = useState<boolean>(false);
  const [dataPlatform, setDataPlatform] = useState();
 
  return (
    <div
      style={
        index === 3
          ? {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }
          : {}
      }
    >
      <div className={`rounded-[100px] text-[#FF8900] text-[10px] font-normal border-1 px-[8px] border-[#FF8900] justify-center items-center flex ${index === 3 ? 'w-[80%]' : ''}`}>
        <p
          className={
            index === 3
              ? "overflow-hidden w-[110px] text-ellipsis whitespace-nowrap"
              : "overflow-hidden w-full text-ellipsis whitespace-nowrap"
          }
        >
          {itemSub?.name}
        </p>
      </div>
      {index === 3 && (
        <Popover placement="right" showArrow={more}>
          <PopoverTrigger>
            <div
              onClick={() => {
                setMore(!more);
              }}
              style={more ? { borderColor: "#FF8900" } : {}}
              className="border-1 border-black w-[20px] rounded-[2px] cursor-pointer p-0 flex justify-center"
            >
              <SvgMore color={more ? "#FF8900" : "black"} />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <ItemSubMore item={dataPlatform} platform={platform} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
