import React from "react";
import ItemSub from "./ItemSub";
import { Platform } from "@/app/order/ultis";

type Item = {};

type Services = {
  platform: string;
  services: Array<any>;
};
type Des = {
  platform: string;
  name: string;
  description: string;
};
interface Props {
  item?: any;
  platform?: string;
}

export default function ItemPlatform(props: Props) {
  const { item, platform } = props;

  return (
    <div className="w-full rounded-[12px] max-lg:border-0">
      <div className="bg-[#F2F4F5] w-full h-[156px] rounded-[12px] flex flex-col p-3 justify-between items-center">
        <div className="flex w-full gap-4 items-center">
          {Platform.map((itemP) => {
            if (itemP.code === platform) {
              return itemP.iconSmall;
            }
          })}
          {item?.descriptions?.map((item: any, index: number) => {
            if (item.platform === platform) {
              return (
                <div className="flex flex-col" key={index}>
                  <p className="text-[#090A0A] text-[16px] font-bold">
                    {item?.name}
                  </p>
                  <p className="text-[#6D563A] text-[12px]" id="description">
                    {item?.description}
                  </p>
                </div>
              );
            }
          })}
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
          {item?.services.map((itemSub: any, index: number) => {
            if (itemSub?.platform === platform) {
              return itemSub.services.map((itemS: any, indexS: number) => {
                return (
                  <div key={index}>
                    <ItemSub
                      itemSub={itemS}
                      index={indexS}
                      platform={platform}
                    />
                  </div>
                );
              });
            }
          })}
        </div>
      </div>
    </div>
  );
}
