import { SVGBell } from "@/app/asset/svgs";
import React, { useEffect, useState } from "react";
import {
  ServiceOrderActions,
  ServiceOrderSelectors,
} from "@/modules/services.order/slice";
import { useAppDispatch } from "@/core/services/hook";
import { useSelector } from "react-redux";

export default function Notifications() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const dataNoti = useSelector(ServiceOrderSelectors.notiList);

  useEffect(() => {
    dispatch(ServiceOrderActions.getNotiList({}));
  }, []);

  return (
    <>
      {/* Overlay để bắt click outside */}
      {show && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setShow(false)}
        />
      )}

      <div className="flex flex-col z-40 relative">
        {/* Button */}
        <div
          className="flex relative cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
          }}
        >
          <p className="text-[#fff] rounded-[20px] text-[10px] bg-[red] p-1 w-[18px] h-[18px] justify-center items-center flex absolute top-0 right-0">
            {dataNoti?.data?.notifications?.length}
          </p>
          <div className="flex justify-center items-center rounded-[20px] border-1 bg-[#F2F4F5] p-2 h-[40px]">
            <SVGBell />
          </div>
        </div>

        {/* Dropdown */}
        {show && (
          <div 
            className="absolute top-[70px] right-4 w-[420px] bg-white border border-gray-200 rounded-md shadow-lg z-40"
            onClick={(e) => e.stopPropagation()}
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
        )}
      </div>
    </>
  );
}
