"use client";

import { SVGFB, SVGGoogle, SVGTiktok, SVGYoutube } from "@/app/asset/svgs";
import { Language } from "@/app/utils/language/language";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { use, useEffect, useRef, useState } from "react";

interface Props {
  title?: string;
  icon?: Element;
  width?: any;
  name?: string;
  isChildren?: boolean;
  handleCheckStatus?: (e: any) => void;
  code?: string;
  status: string
}

interface SelectStatus {
  id?: number;
  code?: string;
  name?: string
}

export default function DropDownStatus(props: Props) {
  const { title, width, handleCheckStatus = () => {}, code, status } = props;
  const [currentServices, setCurrentServices] = useState<any>(null);
  const [showDrop, setShowDrop] = useState(false);
  const btnRef: any = useRef();
  const lang = new Language(window);

  const selectStatus: Array<SelectStatus> = [
    {
      id: 4,
      code: "completed",
      name: lang.gen("bought.completed"),
    },
    {
      id: 1,
      code: "running",
      name: lang.gen("bought.running"),
    },
    {
      id: 2,
      code: "cacelled",
      name: lang.gen("bought.cancelled"),
    },
  ]

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
    if (code) {
      selectStatus.map((item: any, index: number) => {
        if (code === item.code) {
          setCurrentServices(index);
        }
      });
    }
  }, [code]);
  return (
    <div {...props} className="flex flex-col w-full">
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
            {currentServices !== null ? (
              <>
                {selectStatus?.map((item: any, index: number) => {
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
                          {status ? item?.name : lang.gen("bought.select-status")}
                        </p>
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <p>{ lang.gen("bought.select-status")}</p>
            )}
          </>
        </div>
        <ChevronDownIcon width={14} />
      </div>
      <div className=" relative bg-[#fff] flex w-full">
        {showDrop && (
          <div className="flex flex-col gap-3 border-1 border-gray-300 rounded-b-[12px] p-[16px] absolute w-full bg-[#fff] z-10">
            {selectStatus?.map((item: any, index: number) => {
              return (
                <div
                  className="flex cursor-pointer gap-2"
                  key={index}
                  onClick={() => {
                    handleCheckStatus(item.code);
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
