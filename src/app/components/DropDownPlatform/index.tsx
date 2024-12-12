"use client";

import { SVGFB, SVGGoogle, SVGTiktok, SVGYoutube } from "@/app/asset/svgs";
import { Platform } from "@/app/order/ultis";
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
  dataDrop?: any;
  setPlatform?: (e: any) => void;
}

export default function DropDownPlatform(props: Props) {
  const {
    title,
    width,
    handleCheckPlatform = () => {},
    code,
    dataDrop,
    setPlatform = () => {},
  } = props;
  const [currentServices, setCurrentServices] = useState(0);
  const [showDrop, setShowDrop] = useState(false);
  const btnRef: any = useRef();

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

  // const [platform, setPlatform] = useState();
  useEffect(() => {
    if (dataDrop && code) {
      dataDrop.map((item: any) => {
        if (code == item._id) {
          setPlatform(item?.scriptGroupCode);
          Platform.map((itemP: any, index: number) => {
            if (item.scriptGroupCode === itemP.code) {
              setCurrentServices(index);
            }
          });
        }
      });
    } else if (dataDrop) {
      Platform.map((itemP: any, index: number) => {
        if (dataDrop[0]?.scriptGroupCode === itemP.code) {
          setPlatform(itemP.code);
          setCurrentServices(index);
        }
      });
    }
  }, [code, dataDrop]);

  return (
    <div {...props} className="flex flex-col w-full">
      {title}
      <div
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
            {Platform?.map((item: any, index: number) => {
              if (currentServices == index) {
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
            })}
          </>
        </div>
        <ChevronDownIcon width={14} />
      </div>
      <div className=" relative bg-[#fff] flex w-full">
        {showDrop && (
          <div className="flex flex-col gap-3 border-1 border-gray-300 rounded-b-[12px] p-[16px] absolute w-full bg-[#fff] z-10">
            {Platform?.map((item: any, index: number) => {
              return (
                <div
                  className="flex cursor-pointer gap-2"
                  key={index}
                  onClick={() => {
                    handleCheckPlatform(item);
                    setCurrentServices(index);
                    setShowDrop(!showDrop);
                  }}
                >
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
            })}
          </div>
        )}
      </div>
    </div>
  );
}
