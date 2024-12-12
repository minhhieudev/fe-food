"use client";

import { SVGFB, SVGGoogle, SVGTiktok, SVGYoutube } from "@/app/asset/svgs";
import { ChoosePlatform } from "@/app/order/ultis";
import { Language } from "@/app/utils/language/language";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { use, useEffect, useRef, useState } from "react";

interface Props {
  title?: string;
  icon?: Element;
  width?: any;
  name?: string;
  isChildren?: boolean;
  handleCheckPlatform?: (e: any) => void;
  code?: string;
  platform?: any
}

export default function DropDownPlatformMultiSelect(props: Props) {
  const { title, width, handleCheckPlatform = () => { }, code, platform } = props;
  const [currentServices, setCurrentServices] = useState<any[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const btnRef: any = useRef();
  const lang = new Language(window);

  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!btnRef.current?.contains(e.target)) {
        setShowDrop(false);
      }
    });
  }, []);
  useEffect(() => {
    if (platform.length == 0) {
      setCurrentServices(platform)
    }
  }, [platform])
  const handleClickPlatform = (e: any, index: number) => {
    const i: any = currentServices.find((element: any) => element.id == e.id)
    if (currentServices.length <= 0) {
      e.flag = 1
      setCurrentServices([...currentServices, e]);
      handleCheckPlatform([...currentServices, e]);
    } else {
      if (i) {
        i.flag = 0
        let arr = []
        for (let index = 0; index < currentServices.length; index++) {
          const element = currentServices[index];
          if (element.id != i.id) {
            arr.push(element)
          }
          if (currentServices.length - 1 === index) {
            setCurrentServices(arr)
            handleCheckPlatform(arr);
          }

        }
      } else {
        e.flag = 1
        setCurrentServices([...currentServices, e])
        handleCheckPlatform([...currentServices, e]);
      }
    }
  }
  return (
    <div {...props} className="flex flex-col w-full">
      {/* <div
        ref={btnRef}
        className={
          showDrop
            ? "flex border-gray-300 border-1 rounded-t-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
            : "flex border-gray-300 border-1 rounded-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
        }
        style={{
          maxWidth: width,
        }}
        onClick={() => {
          setShowDrop(!showDrop);
        }}
      >
        <div className="flex gap-1">
          <>
            {currentServices.length == 0 ? lang.gen("bought.choose-platform") : <></>}
            {currentServices.length == 0
              ? ChoosePlatform?.map((item: any, index: number) => {
                if (item.id == 0) {
                  return (
                    <div className="flex gap-2" key={index}>
                      {item?.icon}
                      <p
                        className={
                          checkWidth < 700
                            ? "text-ellipsis w-[70px] whitespace-nowrap overflow-hidden"
                            : ""
                        }
                      >
                        {item?.name}
                      </p>
                    </div>
                  );
                }
              })
              : currentServices?.map((item1: any, index1: number) => {
                return (
                  <div
                    className="flex gap-2 border-solid rounded-lg"
                    key={index1}
                  >
                    <p
                      className={
                        checkWidth < 700
                          ? "text-ellipsis w-[70px] whitespace-nowrap overflow-hidden"
                          : ""
                      }
                    >
                      {item1?.name},
                    </p>
                  </div>
                );
              })}
          </>
        </div>
        <ChevronDownIcon width={14} />
      </div> */}
      <div className=" relative bg-[#fff] flex w-full">
        {showDrop && (
          <div className="flex flex-col gap-3 border-1 border-gray-300 rounded-b-[12px] p-[16px] absolute w-full bg-[#fff] z-10">
            {ChoosePlatform?.map((item: any, index: number) => {
              const checkFlag: any = currentServices.find((element: any) => element.id == item.id)
              return (
                <div
                  className="flex cursor-pointer gap-2"
                  key={index}
                  onClick={() => handleClickPlatform(item, index)}
                >
                  {item?.icon}
                  <p
                    className={
                      checkWidth < 700
                        ? "text-ellipsis w-[70px] whitespace-nowrap overflow-hidden flex gap-2"
                        : "flex gap-2"
                    }
                  >
                    {item?.name}{" "}
                    {item && item.flag == 1 && currentServices.length > 0 && checkFlag ? <span>&#10003;</span> : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
