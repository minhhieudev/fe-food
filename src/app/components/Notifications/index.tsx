import { SVGBell } from "@/app/asset/svgs";
import React, { useEffect, useState, useRef } from "react";
import {
  ServiceOrderActions,
  ServiceOrderSelectors,
} from "@/modules/services.order/slice";
import { useAppDispatch } from "@/core/services/hook";
import { useSelector } from "react-redux";
import Portal from "../Portal";

export default function Notifications() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const dataNoti = useSelector(ServiceOrderSelectors.notiList);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(ServiceOrderActions.getNotiList({}));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  // Tính toán vị trí của dropdown dựa vào vị trí của button
  const getDropdownPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };
    
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 15, // Khoảng cách từ button
      right: window.innerWidth - rect.right - window.scrollX,
    };
  };

  const position = getDropdownPosition();

  return (
    <>
      {/* Button */}
      <div
        className="flex relative cursor-pointer"
        onClick={() => setShow(!show)}
        ref={buttonRef}
      >
        <p className="text-[#fff] rounded-[20px] text-[10px] bg-[red] p-1 w-[18px] h-[18px] justify-center items-center flex absolute top-0 right-0">
          {dataNoti?.data?.notifications?.length}
        </p>
        <div className="flex justify-center items-center rounded-[20px] border-1 bg-[#F2F4F5] p-2 h-[40px]">
          <SVGBell />
        </div>
      </div>

      {/* Dropdown rendered through Portal */}
      {show && (
        <Portal>
          <div 
            ref={dropdownRef}
            className="fixed bg-white border border-gray-200 rounded-md shadow-lg"
            style={{
              top: `${position.top}px`,
              right: `${position.right}px`,
              width: '420px',
              zIndex: 99999,
            }}
          >
            <div className="p-[20px]">
              <p className="text-[18px] font-medium mb-4">Thông báo</p>
              <div className="flex flex-col h-[500px] overflow-y-auto">
                {dataNoti?.data?.notifications?.map((item: any, index: number) => {
                  const d = new Date(item?.createdAt);
                  const time = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

                  return (
                    <div 
                      key={index} 
                      className="py-[20px] border-b border-gray-200 last:border-b-0"
                    >
                      <div 
                        className="text-[16px] text-[#FF8900] cursor-pointer font-bold"
                        dangerouslySetInnerHTML={{ __html: item?.content }}
                      />
                      <p className="text-[14px] text-[#72777A] font-thin mt-1">
                        {time}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
