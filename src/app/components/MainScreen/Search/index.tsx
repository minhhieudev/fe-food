import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { SvgSearch } from "@/app/asset/svgs";
import { log } from "util";
import { formatPriceVND } from "@/app/utils/units";
import { CurrencySelector } from "@/modules/currency/slice";
import { useAppSelector } from "@/core/services/hook";
import { Platform } from "@/app/order/ultis";
import { Button } from "@nextui-org/react";
import { useTranslate } from "@/core/hooks/useTranslateData";

interface Props {
  title?: string;
  handleChangeSearch?: (e: any) => void;
  handleSearch?: () => void;
  handleSetData?: (e: any) => void;
  data?: any;
}
const st = classNames.bind(styles);
export default function Search(props: Props) {
  const {
    title,
    handleChangeSearch = () => {},
    handleSearch = () => {},
    handleSetData = () => {},
    data,
  } = props;
  const [show, setShow] = useState(false);
  const currency = useAppSelector(CurrencySelector.currency);
  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  const { getServiceName } = useTranslate(window);

  const btnRef: any = useRef();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!btnRef.current?.contains(e.target)) {
        setShow(false);
      }
    });
  }, []);
  const handleShow = () => {
    handleSearch && handleSearch();
    setShow(!show);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleShow();
    }
  };
  return (
    <div className="flex flex-col">
      <div className={st("container-search")} ref={btnRef}>
        <div className={st("txt-input")}>
          <input
            type="text"
            name="name"
            onKeyPress={handleKeyPress}
            placeholder={title || "Tìm kiếm..."}
            onChange={(e: any) => handleChangeSearch(e?.target.value)}
          />
        </div>
        <div className={st("search")} onClick={handleShow}>
          <SvgSearch />
        </div>
      </div>
      <div className="flex relative">
        {data?.length > 0 && show ? (
          <div className="w-full max-h-[400px] overflow-y-auto z-10 absolute border-1 border-gray-300 mt-2 rounded-[10px] p-[10px] bg-[#fff] flex flex-col gap-2">
            {data?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleChangeSearch("");
                    handleSetData(item);
                  }}
                >
                  <div
                    className="flex border-gray-300 border-1 rounded-[10px] px-[16px] py-[8px] cursor-pointer justify-between "
                    style={{
                      minWidth: 300,
                    }}
                  >
                    <div className="flex gap-1 justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          {Platform?.map((itemp: any, index: number) => {
                            if (item?.scriptGroupCode == itemp?.code) {
                              return (
                                <div key={index} className="">
                                  {itemp?.icon}
                                </div>
                              );
                            }
                          })}
                          <p
                            className={
                              checkWidth < 600
                                ? "text-ellipsis w-[200px] whitespace-nowrap overflow-hidden"
                                : ""
                            }
                          >
                            {item?.serviceCode
                              ? getServiceName(item.serviceCode)
                              : item?.name}
                          </p>
                        </div>
                        <div className=" inline-block text-[12px] ">
                          {item?.serviceTags.map((item: any, index: number) => {
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
                      <p className="text-[#FF8900] text-[16px]">
                        {formatPriceVND(
                          Number(
                            (
                              Number(item.price) * Number(currency.exchangeRate)
                            ).toFixed(10)
                          )
                        )}{" "}
                        {currency.code}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
