"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderHome.module.scss";
import { SVGChevronDown, SVGChevronUp, SVGLogo } from "@/app/asset/svgs";
import Search from "../Search";
import User from "../User";
const st = classNames.bind(styles);

export default function HeaderHome() {
  const [current, setCurrent] = useState(0);

  const services = [
    {
      id: 0,
      title: "Tương tác MXH",
    },
    {
      id: 1,
      title: "Google Map",
    },
    {
      id: 2,
      title: "Seeding MXH",
    },
    {
      id: 3,
      title: "Youtube",
    },
    {
      id: 4,
      title: "Keyword tool",
    },
    {
      id: 5,
      title: "Content",
    },
  ];
  const handleSwitch = (e: any) => {
    setCurrent(e);
  };
  return (
    <div className="flex justify-between max-w-[1920px] items-center mx-auto px-4 py-4">
      <div className=" flex gap-[20px] items-center justify-between px-10">
        <SVGLogo />
        <div className="flex gap-[20px] flex-row cursor-pointer xl:flex">
          {services.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex p-2 justify-center items-center"
                onClick={() => handleSwitch(index)}
              >
                <p
                  className=" text-[12px] font-medium text-[#fff]"
                  style={
                    current == index
                      ? { color: "red", borderBottom: "1px solid red" }
                      : {}
                  }
                >
                  {item?.title}
                </p>
                {current == index ? (
                  <SVGChevronDown color={"red"} />
                ) : (
                  <SVGChevronUp />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-[20px]">
        <div className="block xl:flex">
          <Search title="Tìm kiếm dịch vụ" />
        </div>
        <User />
      </div>
    </div>
  );
}
