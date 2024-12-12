"use client";

import { SVGFB, SVGYoutube } from "@/app/asset/svgs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { ReactElement, use, useEffect, useRef, useState } from "react";

interface Props {
  title?: string | any;
  icon?: Element;
  width?: any;
  name?: string;
  isChildren?: boolean;
  dataDrop?: any;
  handlePick?: (e: any) => void;
  id?: string;
  placeholder?: string;
}

export default function DropDownCustom(props: Props) {
  const {
    title,
    width,
    name,
    isChildren = false,
    dataDrop,
    id,
    handlePick = () => {},
    placeholder,
  } = props;
  const [currentServices, setCurrentServices] = useState(0);
  const [showDrop, setShowDrop] = useState(false);
  const btnRef: any = useRef();
  const [show, setShow] = useState(false);

  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  const [description, setDescription] = useState("");
  const [descriptionTag, setDescriptionTag] = useState<any>(null);
  const [showMore, setShowMore] = useState(false);
  const flagToSet = useRef<boolean>(false)

  useEffect(() => {
    if (descriptionTag) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length === 1) {
          if (entries[0].contentRect.height > 18) {
            if(!showMore && !flagToSet.current) {
              setShowMore(true)
              flagToSet.current = true
            }
          } else {
          }
        }
      });

      resizeObserver.observe(descriptionTag);
    }
  }, [descriptionTag, showMore]);

  useEffect(() => {
    flagToSet.current = false;
    setShowMore(false);
    if (!id) {
      setDescription("");
    } else {
      const itemSelected = dataDrop?.serviceGroups?.find(
        (item: any) => item._id === id
      );
      setDescription(itemSelected?.description || "");
    }
  }, [id, dataDrop]);

  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);
  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (!btnRef.current?.contains(e.target)) {
        setShowDrop(false);
      }
    });
  }, []);

  return (
    <div {...props} className="flex flex-col w-full" id="checkService">
      {title}
      <div
        className={
          showDrop
            ? "flex border-gray-300 border-1 rounded-t-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
            : "flex border-gray-300 border-1 rounded-[4px] px-[16px] py-[8px] cursor-pointer justify-between "
        }
        style={{
          maxWidth: width,
        }}
        ref={btnRef}
        onClick={() => {
          setShowDrop(!showDrop);
        }}
      >
        <div className="flex gap-1">
          {id ? (
            <>
              {dataDrop?.serviceGroups?.map((item: any, index: number) => {
                if (item?._id == id) {
                  return (
                    <div className="flex gap-2" key={index} onClick={() => {}}>
                      <p
                        className={
                          checkWidth < 700
                            ? "text-ellipsis whitespace-nowrap overflow-hidden"
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
          ) : (
            <>
              {placeholder ? (
                <div className="flex gap-2">
                  <p
                    className={
                      checkWidth < 700
                        ? "text-ellipsis whitespace-nowrap overflow-hidden"
                        : ""
                    }
                  >
                    {placeholder}
                  </p>
                </div>
              ) : (
                <>
                  {dataDrop?.serviceGroups?.map((item: any, index: number) => {
                    if (currentServices == index) {
                      return (
                        <div
                          className="flex gap-2"
                          key={index}
                          onClick={() => {}}
                        >
                          <p
                            className={
                              checkWidth < 700
                                ? "text-ellipsis whitespace-nowrap overflow-hidden"
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
              )}
            </>
          )}
        </div>
        <ChevronDownIcon width={14} />
      </div>
      {description && (
        <div className="flex">
          <p
            ref={(ref) => setDescriptionTag(ref)}
            className={`flex-1 font-[400] text-[12px] text-[#72777A] ${
              showMore ? "text-ellipsis whitespace-nowrap overflow-hidden" : ""
            }`}
          >
            {description}
          </p>
          {showMore && (
            <div
              className="font-[400] text-[12px] text-[#FF8900] ml-[2px]"
              onClick={() => setShowMore(false)}
            >
              Xem thêm.
            </div>
          )}
        </div>
      )}

      <div className=" relative bg-[#fff] flex w-full">
        {showDrop && !isChildren && (
          <div className="flex flex-col gap-3 border-1 border-gray-300 rounded-b-[12px] p-[16px] absolute w-full bg-[#fff] z-10">
            {dataDrop?.serviceGroups?.map((item: any, index: number) => {
              return (
                <div
                  className="flex cursor-pointer gap-2"
                  key={index}
                  onClick={() => {
                    handlePick(item?._id);
                    setCurrentServices(index);
                    setShowDrop(!showDrop);
                    setShow(true);
                  }}
                >
                  {item?.icon}
                  <p
                    className={
                      checkWidth < 700
                        ? "text-ellipsis whitespace-nowrap overflow-hidden"
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
        {showDrop && isChildren && (
          <div className="flex flex-col gap-3 border-1 border-gray-300 rounded-b-[12px] p-[16px] absolute w-full bg-[#fff]">
            {dataDrop?.serviceGroups?.map((item: any, index: number) => {
              return (
                <div
                  className="flex cursor-pointer gap-2"
                  key={index}
                  onClick={() => {
                    setCurrentServices(index);
                    setShowDrop(!showDrop);
                  }}
                >
                  <p
                    className={
                      checkWidth < 700
                        ? "text-ellipsis whitespace-nowrap overflow-hidden"
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

