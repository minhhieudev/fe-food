"use client";

import { SVGDollar } from "@/app/asset/svgs";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { formatPriceVND } from "@/app/utils/units";
import { PaymentActions, PaymentSelectors } from "@/modules/payment/slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Language } from "@/app/utils/language/language";
import { useAppSelector } from "@/core/services/hook";
import { CurrencySelector } from "@/modules/currency/slice";
import { SettingActions, SettingSelectors } from "@/modules/setting/slice";
export default function Infor({ isShowInfo }: any) {
  const lang = new Language(window);
  const currency = useAppSelector(CurrencySelector.currency);

  const dispatch = useDispatch();

  const dataWallet = useSelector(PaymentSelectors.wallet);
  const dataSupport = useSelector(SettingSelectors.setting);
  useEffect(() => {
    dispatch(SettingActions.getSetting({}));
  }, []);
  useEffect(() => {
    dispatch(
      PaymentActions.getWallet({
        onSuccess: (rs: any) => {},
      })
    );
  }, []);
  const dataMoney = [
    {
      id: 0,
      buget: dataWallet?.data?.wallet?.totalRecharged,
      title: lang.gen("recharge.totalloaded"),
    },
    {
      id: 1,
      buget: dataWallet?.data?.wallet?.balance,
      title: lang.gen("recharge.currentBalance"),
    },
  ];
  return (
    <div className="flex flex-col gap-[12px] ">
      {isShowInfo && (
        <div>
          <p className=" font-bold">Trương Mỹ Dung</p>
          <div className="flex gap-1">
            <EnvelopeIcon width={16} color="#72777A" />
            <p className="text-[#72777A]">truongmydung@gmail.com</p>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        {dataMoney?.map((item: any, index: number) => {
          return (
            <div className="flex" key={index}>
              {index == 0 && (
                <div className="flex flex-col border-dashed border-1 border-[#72777A] px-[24px] py-[8px] rounded-[4px]">
                  <p>{lang.gen("recharge.totalloaded")}</p>
                  <div className="flex text-[#FF8900]">
                    <SVGDollar />
                    <p>
                      {formatPriceVND(
                        Number(
                          (
                            Number(item?.buget) * Number(currency.exchangeRate)
                          ).toFixed(5)
                        )
                      )}{" "}
                      {currency.code}
                    </p>
                  </div>
                </div>
              )}
              {index == 1 && (
                <div className="flex flex-col border-dashed border-1 border-[#72777A] px-[24px] py-[8px] rounded-[4px]">
                  <p>{lang.gen("recharge.currentBalance")}</p>
                  <div className="flex text-[#50CD89]">
                    <SVGDollar color={"#50CD89"} />
                    <p>
                      {formatPriceVND(
                        Number(
                          (
                            Number(item?.buget) * Number(currency?.exchangeRate)
                          ).toFixed(5)
                        )
                      )}{" "}
                      {currency.code}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {dataSupport?.setting?.data?.settings.map((item: any, index:number) =>{
        if(item.key == 'depositDiscount'){
          return(
            <>
              <div className="max-lg:hidden flex gap-[20px]" key={index}>
                  { item.value.map((e:any, index1:number)=>{
                    return (
                      <>
                        <div className= {lang.gen("recharge.raise-more-money") == 'Increase money when loading words'
                        ? "flex gap-[24px] w-[330px] h-[62px] border border-[#FF8900] rounded-[4px]" 
                        :"flex gap-[24px] w-[250px] h-[62px] border border-[#FF8900] rounded-[4px]" }  key={index1}>
                          <div className=" bg-[#FFAA47] px-[8px] py-[12px] border-dashed border-r-[4px]">
                            <p className="fond-bold text-[12px] leading-[20px] text-[#ffffff]">{lang.gen("recharge.raise-more-money")}</p>
                            <p className="fond-bold text-[16px] leading-[20px] text-[#ffffff] ml-[1rem]"> {formatPriceVND(Number(Number((e.amount)).toFixed(5)))}{" "}</p>
                          </div>
                          <div className="fond-bold text-[24px] leading-[20px] text-[#FF8900] px-[8px] py-[20px]">{e.discountPercent}%</div>
                        </div>
                      </>
                    )
                  })}
              </div>
              
              <div className="hidden max-lg:flex flex-wrap gap-[20px]" key={index}>
                  {  item.value.map((e:any, index1:number)=>{
                    return (
                      <>
                        <div className={lang.gen("recharge.raise-more-money") == 'Increase money when loading words'
                        ? "flex gap-[24px] w-[330px] h-[62px] border border-[#FF8900] rounded-[4px]" 
                        : "flex gap-[24px] w-[250px] h-[62px] border border-[#FF8900] rounded-[4px]" } key={index1}>
                          <div className=" bg-[#FFAA47] px-[8px] py-[12px] border-dashed border-r-[4px]">
                            <p className="fond-bold text-[12px] leading-[20px] text-[#ffffff]">{lang.gen("recharge.raise-more-money")}</p>
                            <p className="fond-bold text-[16px] leading-[20px] text-[#ffffff] ml-[1rem]"> {formatPriceVND(Number(Number((e.amount)).toFixed(5)))}</p>
                          </div>
                          <div className="fond-bold text-[24px] leading-[20px] text-[#FF8900] px-[8px] py-[20px]">{e.discountPercent}%</div>
                        </div>
                      </>
                    )
                  })}
              </div>
            </>
          )
        }
      })}
    </div>
  );
}