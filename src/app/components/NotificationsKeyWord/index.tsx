import { SVGBell } from "@/app/asset/svgs";
import React, { useEffect, useRef, useState } from "react";
import {
  ServiceOrderActions,
  ServiceOrderSelectors,
} from "@/modules/services.order/slice";
import { useAppDispatch } from "@/core/services/hook";
import { useSelector } from "react-redux";
export default function NotificationsKeyWord() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const dataNoti = useSelector(ServiceOrderSelectors.notiList);
  const btnRef: any = useRef();
  useEffect(() => {
    dispatch(ServiceOrderActions.getNotiList({}));
  }, []);
  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (!btnRef.current.contains(e.target)) {
        setShow(false);
      }
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        ref={btnRef}
        className="flex h-[50px] relative cursor-pointer items-center "
        onClick={() => {
          setShow(!show);
        }}
      >
        <p className="text-[#fff] rounded-[20px] text-[10px] bg-[red] p-1 w-[18px] h-[18px] justify-center items-center flex absolute top-0 right-0 ">
          {dataNoti?.data?.notifications?.length}
        </p>
        <div className="flex justify-center items-center rounded-[20px] border-1 bg-[#F2F4F5] p-2 h-[30px]">
          <SVGBell />
        </div>
      </div>
      <div className="flex justify-center">
        {show && (
          <div className="flex p-[20px] absolute flex-col border-solid border-1 z-10 rounded-md top-[70px] right-4 bg-[#fff] w-[420px]">
            <p className="text-[18px]">Thông báo</p>
            <div className="flex flex-col h-[500px] overflow-y-auto">
              {dataNoti?.data?.notifications?.map(
                (item: any, index: number) => {
                  let d = new Date(item?.createdAt);
                  let time =
                    d.getHours() +
                    ":" +
                    d.getMinutes() +
                    "   " +
                    d.getDate() +
                    "/" +
                    "" +
                    (d.getMonth() + 1) +
                    "/" +
                    d.getFullYear();

                  return (
                    <div
                      key={index}
                      className="border-b-1 border-gray-200 py-[20px]"
                    >
                      <p className="text-[16px] text-[#FF8900] cursor-pointer font-bold">
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                          onClick={() => {}}
                        />
                      </p>
                      <p className="text-[14px] text-[#72777A] font-thin">
                        {time}
                      </p>
                    </div>
                  );
                }
              )}
            </div>

            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
