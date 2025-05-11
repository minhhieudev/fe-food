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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        {isShowInfo && (
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Trương Mỹ Dung</p>
              <div className="flex items-center gap-1 text-gray-500">
                <EnvelopeIcon width={14} />
                <p className="text-sm">truongmydung@gmail.com</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ô thứ nhất - Tổng đã nạp (màu cam) */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="absolute inset-0 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="75" cy="25" r="20" fill="currentColor" fillOpacity="0.5" />
                <circle cx="25" cy="75" r="10" fill="currentColor" fillOpacity="0.5" />
                <circle cx="85" cy="85" r="15" fill="currentColor" fillOpacity="0.5" />
              </svg>
            </div>
            <div className="relative p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 font-medium text-sm mb-1">{dataMoney[0].title}</p>
                  <div className="flex items-end gap-1">
                    <p className="text-2xl font-bold">
                      {formatPriceVND(Number((Number(dataMoney[0]?.buget) * Number(currency.exchangeRate)).toFixed(2)))}
                    </p>
                    <p className="mb-1">{currency.code}</p>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ô thứ hai - Số dư hiện tại (màu xanh lá) */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500">
            <div className="absolute inset-0 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="75" cy="25" r="20" fill="currentColor" fillOpacity="0.5" />
                <circle cx="25" cy="75" r="10" fill="currentColor" fillOpacity="0.5" />
                <circle cx="85" cy="85" r="15" fill="currentColor" fillOpacity="0.5" />
              </svg>
            </div>
            <div className="relative p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 font-medium text-sm mb-1">{dataMoney[1].title}</p>
                  <div className="flex items-end gap-1">
                    <p className="text-2xl font-bold">
                      {formatPriceVND(Number((Number(dataMoney[1]?.buget) * Number(currency.exchangeRate)).toFixed(2)))}
                    </p>
                    <p className="mb-1">{currency.code}</p>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Ưu đãi khi nạp tiền</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dataSupport?.setting?.data?.settings.map((item: any) => {
            if(item.key == 'depositDiscount') {
              return item.value.map((e: any, idx: number) => (
                <div key={idx} className="group relative rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="absolute -right-10 -top-10 w-20 h-20 bg-emerald-500 rotate-45 transform group-hover:scale-110 transition-transform"></div>
                  <div className="absolute right-1 top-1 text-white font-bold text-xs transform rotate-45">
                    {e.discountPercent}%
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 text-sm">{lang.gen("recharge.raise-more-money")}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{formatPriceVND(Number(e.amount))}</p>
                    <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">{lang.gen("recharge.bonus")}</div>
                        <div className="text-lg font-bold text-emerald-500">+{formatPriceVND(Number(e.amount) * (e.discountPercent/100))}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ));
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}