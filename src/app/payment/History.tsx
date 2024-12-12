"use client";
import React, { useEffect, useState } from "react";
import HistoryTable from "./HistoryTable";
import { SvgFilter } from "../asset/svgs";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PaymentActions, PaymentSelectors } from "@/modules/payment/slice";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { useSelector } from "react-redux";
import { takeTimeCustom } from "../utils/units";
import Datepicker from "react-tailwindcss-datepicker";
import { Language } from "../utils/language/language";
import { CurrencySelector } from "@/modules/currency/slice";

const moment = require("moment");
export default function History() {
  const dispatch = useAppDispatch();
  const lang = new Language(window);
  const currency = useAppSelector(CurrencySelector.currency);
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const dataHistory = useSelector(PaymentSelectors?.history);

  const dataPick = [
    {
      id: 0,
      title: lang.gen("recharge.today"),
      code: "today",
    },
    {
      id: 1,
      title: lang.gen("recharge.yesterday"),
      code: "preDay",
    },
    {
      id: 2,
      title: lang.gen("recharge.last30Days"),
      code: "pre30",
    },
    {
      id: 3,
      title: lang.gen("recharge.thisMonth"),
      code: "thisMonth",
    },
    {
      id: 4,
      title: lang.gen("recharge.lastMonth"),
      code: "preMonth",
    },
    {
      id: 5,
      title: lang.gen("recharge.select"),
      code: "any",
    },
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    dispatch(PaymentActions.getPaymentHistory({}));
  }, []);
  const [time, setTime] = useState<any>();
  const handleFilterTime = (item: any) => {
    setShowDrop(!showDrop)
    let a = takeTimeCustom(item?.code);
    if (a) {
      dispatch(
        PaymentActions.getPaymentHistory({
          fromDate: a.first,
          toDate: a.end,
          onSuccess: (rs: any) => {},
          onFail: (rs: any) => {},
        })
      );
    }
  };
  const [value, setValue] = useState<any>();

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    if (newValue) {
      let start = newValue.startDate + "T" + "00:00:00";
      let end = newValue.endDate + "T" + "23:59:59";
      dispatch(
        PaymentActions.getPaymentHistory({
          fromDate: start,
          toDate: end,
          onSuccess: (rs: any) => {},
          onFail: (rs: any) => {},
        })
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-white py-4 rounded-xl pb-6">
          <div
            style={{
              display: "flex",
              padding: "0px 24px 20px 24px",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {lang.gen("recharge.loadingHistory")}
            </p>
          </div>
          <div className="rounded-xl bg-white px-6 flex justify-end gap-6">
            <div className="flex flex-col justify-center">
              <div
                className="items-center border-[1px] rounded-[4px] flex h-[40px] justify-center cursor-pointer w-[200px] gap-2 flex-col"
                onClick={() => {
                  setShowDrop(!showDrop);
                }}
              >
                <div className="flex justify-center items-center gap-2">
                  <SvgFilter />
                  <p className="text-[#72777A]">
                    {lang.gen("recharge.filterByTime")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-20 flex">
            {showDrop && (
              <div className="absolute flex gap-[20px] p-[20px] justify-center flex-col bg-[#fff] w-[320px] h-[300px] right-0 mr-[20px] mt-[4px] border-1 border-gray-300 rounded-[12px]">
                {dataPick?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setCurrent(index);
                        handleFilterTime && handleFilterTime(item);
                      }}
                      className={
                        current == index
                          ? "flex cursor-pointer bg-[#E3E5E5] px-2 rounded-[12px] justify-between items-center"
                          : "flex cursor-pointer  px-2 rounded-[12px] justify-between items-center"
                      }
                    >
                      {item?.title}
                      {current == index && index != 5 && (
                        <CheckIcon width={16} />
                      )}
                      {index == 5 && (
                        <div className="w-[200px] p-1">
                          <Datepicker
                            value={value}
                            onChange={handleValueChange}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <HistoryTable currency={currency} dataHistory={dataHistory} />
        </div>
      </div>
    </div>
  );
}
