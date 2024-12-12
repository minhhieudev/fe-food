import React from "react";
import {
  SVGFB,
  SVGGoogle,
  SVGRocket,
  SVGTiktok,
  SVGYoutube,
} from "../asset/svgs";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { CurrencySelector } from "@/modules/currency/slice";
import { useRouter } from "next/navigation";
import { ServicePackageActions } from "@/modules/services.package/slice";
import { useTranslate } from "@/core/hooks/useTranslateData";
import { Platform } from "../order/ultis";
interface Props {
  data?: any;
}
export default function ItemList(props: Props) {
  const currency = useAppSelector(CurrencySelector.currency);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getServiceName } = useTranslate(window);

  const { data } = props;

  const platform = [
    {
      platform: "facebook",
      icon: <SVGFB />,
    },
    {
      platform: "tiktok",
      icon: <SVGTiktok />,
    },
    {
      platform: "youtube",
      icon: <SVGYoutube />,
    },
    {
      platform: "google",
      icon: <SVGGoogle />,
    },
  ];
  const handleDirection = (item: any) => {
    dispatch(
      ServicePackageActions.getServicePackageHot({
        onSuccess: (rs: any) => {
          if (rs.success == true) {
            router.push(`/order?_id=${item?._id}`);
          }
        },
      })
    );
  };
  return (
    <div className="flex p-[20px] border-1 border-gray-200 rounded-md flex-col gap-[20px]">
      <div className="flex items-center gap-1 text-[18px]">
        <p>Các dịch vụ hot</p>
        <SVGRocket />
      </div>
      <div>
        <div className="flex flex-col gap-[20px]">
          {data?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex border-1 border-gray-200 rounded-md p-[12px] gap-2 justify-between flex-col cursor-pointer"
                onClick={() => handleDirection(item)}
              >
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    {Platform?.map((itemPlatform: any) => {
                      if (itemPlatform.code === item?.scriptGroupCode) {
                        // eslint-disable-next-line react/jsx-key
                        return <div>{itemPlatform?.icon}</div>;
                      }
                    })}
                    <p className="text-[16px] font-bold">
                      {item?.serviceCode
                        ? getServiceName(item.serviceCode)
                        : item?.name}
                    </p>
                  </div>
                  <p className="text-[#FF8900]">
                    {Number(
                      (
                        Number(item?.price) * Number(currency.exchangeRate)
                      ).toFixed(5)
                    )}{" "}
                    {currency.code}
                  </p>
                </div>

                <div className=" inline-block text-[12px] ">
                  {item?.serviceTags?.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="border-1 border-[#FF8900] rounded-[20px] px-2 text-[#FF8900] inline-block mr-2"
                      >
                        <p className="text-ellipsis">{item}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
