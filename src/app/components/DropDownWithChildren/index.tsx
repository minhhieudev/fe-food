"use client";

import { SVGFB, SVGGoogle, SVGTiktok, SVGYoutube } from "@/app/asset/svgs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { use, useEffect, useState } from "react";

interface Props {
  title?: string;
  icon?: Element;
  width?: any;
  name?: string;
}

export default function DropDownPlatform(props: Props) {
  const { title, icon, width, name } = props;
  const [currentServices, setCurrentServices] = useState(0);
  const [showDrop, setShowDrop] = useState(false);

  const data = [
    {
      id: 0,
      icon: <SVGFB />,
      name: "FaceBook",
      code: "facebook",
    },
    {
      id: 1,
      icon: <SVGYoutube />,
      name: "Youtube",
      code: "youtube",
    },
    {
      id: 2,
      icon: <SVGGoogle />,
      name: "Google",
      code: "google",
    },
    {
      id: 3,
      icon: <SVGTiktok />,
      name: "Tiktok",
      code: "tiktok",
    },
  ];
  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);

  return (
    <div {...props} className="flex flex-col w-full">
      {title}
      <div
        className={
          showDrop
            ? "flex border-gray-300 border-1 rounded-t-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
            : "flex border-gray-300 border-1 rounded-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
        }
        style={{
          minWidth: width,
        }}
        onClick={() => {
          setShowDrop(!showDrop);
        }}
      >
        <div className="flex gap-1">
          <>
            {data?.map((item: any, index: number) => {
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
            {data?.map((item: any, index: number) => {
              return (
                <div
                  className="flex cursor-pointer gap-2"
                  key={index}
                  onClick={() => {
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
