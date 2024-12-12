"use client";

import { SVGFB, SVGGoogle, SVGTiktok, SVGYoutube } from "@/app/asset/svgs";
import { formatPriceVND } from "@/app/utils/units";
import { useAppSelector } from "@/core/services/hook";
import { CurrencySelector } from "@/modules/currency/slice";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/core/services/hook";
import { useTranslate } from "@/core/hooks/useTranslateData";
import { Platform } from "@/app/order/ultis";
interface Props {
  title?: string;
  width?: any;
  setAttributes?: (e: any) => void;
  id?: string;
  checkService?: boolean;
  dataDrop?: any;
}

export default function DropDownServices(props: Props) {
  const {
    title,
    width,
    setAttributes = () => {},
    id,
    checkService,
    dataDrop,
  } = props;
  const { getServiceName } = useTranslate(window);
  const dispatch = useAppDispatch();
  const [currentServices, setCurrentServices] = useState<any>();
  const [showDrop, setShowDrop] = useState(false);
  const btnRef: any = useRef();
  const currency = useAppSelector(CurrencySelector.currency);
  const [show, setShow] = useState(false);
  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);
  const [platform, setPlatform] = useState<any>();

  useEffect(() => {
    if (id) {
      dataDrop.map((item: any, index: number) => {
        if (item?._id == id) {
          setPlatform(item.scriptGroupCode);
          setAttributes(item);
          setCurrentServices(index);
        } else {
        }
      });
    } else {
      setPlatform(dataDrop[0].scriptGroupCode);
      setAttributes(dataDrop[0]);
      setCurrentServices(0);
    }
  }, [dataDrop]);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (!btnRef.current?.contains(e.target)) {
        setShowDrop(false);
      }
    });
  }, []);

  return (
    <div {...props} className="flex flex-col w-full">
      <p className="pb-0">{title}</p>
      {checkService ? (
        <>
          {!show && id && checkService ? (
            <>
              {dataDrop?.map((item: any, index: number) => {
                if (item?._id == id) {
                  return (
                    <div key={index}>
                      <div
                        className={
                          showDrop
                            ? "flex border-gray-300 border-1 rounded-t-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
                            : "flex border-gray-300 border-1 rounded-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
                        }
                        style={{
                          minWidth: width,
                        }}
                        ref={btnRef}
                        onClick={() => {
                          setShowDrop(!showDrop);
                        }}
                      >
                        <div className="flex gap-1">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              {Platform?.map((item: any, index: number) => {
                                if (platform == item?.code) {
                                  return (
                                    <div key={index} className="">
                                      {item?.icon}
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
                              {item?.serviceTags?.map(
                                (item: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      className="border-1 border-[#FF8900] rounded-[20px] px-2 text-[#FF8900] inline-block mr-2"
                                    >
                                      <p className="text-ellipsis">{item}</p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronDownIcon width={14} />
                      </div>
                    </div>
                  );
                }
              })}
            </>
          ) : (
            <>
              {dataDrop?.map((item: any, index: number) => {
                if (currentServices == index) {
                  return (
                    <div key={index}>
                      <div
                        className={
                          showDrop
                            ? "flex border-gray-300 border-1 rounded-t-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
                            : "flex border-gray-300 border-1 rounded-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
                        }
                        style={{
                          minWidth: width,
                        }}
                        ref={btnRef}
                        onClick={() => {
                          setShowDrop(!showDrop);
                        }}
                      >
                        <div className="flex gap-1">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              {Platform?.map((item: any, index: number) => {
                                if (platform == item?.code) {
                                  return (
                                    <div key={index} className="">
                                      {item?.icon}
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
                              {item?.serviceTags?.map(
                                (item: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      className="border-1 border-[#FF8900] rounded-[20px] px-2 text-[#FF8900] inline-block mr-2"
                                    >
                                      <p className="text-ellipsis">{item}</p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronDownIcon width={14} />
                      </div>
                    </div>
                  );
                }
                (";");
              })}
            </>
          )}
        </>
      ) : (
        <p className="text-[red]">Không có dịch vụ, vui lòng chọn lại!</p>
      )}

      <div className=" relative bg-[#fff] flex w-full z-10">
        {showDrop && (
          <div className="flex flex-col gap-3 border-1 border-gray-300 rounded-b-[12px] p-[16px] absolute w-full bg-[#fff] z-30 overflow-y-scroll max-h-[500px]">
            {dataDrop?.map((item: any, index: number) => {
              if (platform == item.scriptGroupCode)
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setAttributes(item);
                      setCurrentServices(index);
                      setShowDrop(!showDrop);
                      setShow(true);
                    }}
                  >
                    <div
                      className={
                        currentServices == index
                          ? "flex border-[#FF8900] border-1 rounded-[10px] px-[16px] py-[8px] cursor-pointer justify-between "
                          : "flex border-gray-300 border-1 rounded-[10px] px-[16px] py-[8px] cursor-pointer justify-between "
                      }
                      style={{
                        minWidth: width,
                      }}
                      onClick={() => {
                        setShowDrop(!showDrop);
                      }}
                    >
                      <div className="flex gap-1 justify-between w-full">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            {Platform?.map((item: any, index: number) => {
                              if (platform == item?.code) {
                                return (
                                  <div key={index} className="">
                                    {item?.icon}
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
                                : item.name}
                            </p>
                          </div>
                          <div className=" inline-block text-[12px] ">
                            {item?.serviceTags.map(
                              (item: any, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="border-1 border-[#FF8900] rounded-[20px] px-2 text-[#FF8900] inline-block mr-2"
                                  >
                                    <p className="text-ellipsis">{item}</p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <p className="text-[#FF8900] text-[16px]">
                          {formatPriceVND(
                            Number(
                              (
                                Number(item.price) *
                                Number(currency.exchangeRate)
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
        )}
      </div>
    </div>
  );
}
