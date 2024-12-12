import React from "react";
import { Platform } from "@/app/order/ultis";
interface Props {
  item?: any;
  platform?: string;
}

export default function ItemSubMore(props: Props) {
  const { item, platform } = props;

  return (
    <div className="flex justify-start items-center rounded-[8px] p-3 z-10 flex-col gap-3 w-[300px] overflow-auto max-h-[500px] ">
      {item?.map((itemSub: any, index: number) => {
        return (
          <div key={index} className="flex flex-col gap-1 w-full">
            <div className="flex gap-2 items-center  w-full">
              {Platform.map((itemP: any, indexP: number) => {
                if (platform === itemP.code) {
                  return <div key={indexP}>{itemP.iconLarge}</div>;
                }
              })}
              <p className="font-normal">{itemSub?.name}</p>
            </div>
            <div className="flex gap-1">
              {itemSub?.tags?.map((itemSub2: any, indexSub2: number) => {
                return (
                  <div
                    key={indexSub2}
                    className="rounded-[100px] text-[#FF8900] text-[8px] font-normal border-1 px-[8px] border-[#FF8900] justify-center items-center flex"
                  >
                    <p className="overflow-hidden  text-ellipsis whitespace-nowrap">
                      {itemSub2}
                    </p>
                  </div>
                );
              })}
            </div>
            {index < item?.length - 1 && (
              <div className="border-b-1 border-[#F2F4F5] pt-1 w-full"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
