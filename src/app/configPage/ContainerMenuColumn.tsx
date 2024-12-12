"use client";

import { useTranslate } from "@/core/hooks/useTranslateData";
import { useAppDispatch } from "@/core/services/hook";
import { AuthActions } from "@/modules/auth/slice";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ContainerMenuColumn = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(
      AuthActions.getMenuService({
        onSuccess: (rs: any) => {
          setData(rs?.menuServices || []);
        },
      })
    );
  }, []);

  return (
    <>
      <div className="lg:block hidden p-[10px] h-[800px] overflow-auto  bg-[#F7F9FA]" >
        {data.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div className="px-4 pt-2 w-[280px] menu-column">
                <div className="uppercase font-bold text-[18px] text-[#FF8900] leading-5 mt-2">
                  {item?.name}
                </div>
                {item.serviceGroups.map(
                  (itemSerivceGroup: any, indexSerivceGroup: number) => {
                    return (
                      <OneSubMenu
                        key={`${indexSerivceGroup}-indexSerivceGroup`}
                        itemSerivceGroup={itemSerivceGroup}
                        item={item}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ContainerMenuColumn;

const OneSubMenu = ({ itemSerivceGroup, item }: any) => {
  const router = useRouter();

  const [isShow, setIsShow] = useState(false);
  const { getServiceName } = useTranslate(window);

  return (
    <div>
      <div className="flex">
        <button
          role="button"
          onClick={() => setIsShow(!isShow)}
          className="w-full ml-3 mt-1 p-2 flex justify-between"
        >
          <p className="text-[16px] text-[#303437] font-bold leading-6  max-w-56 truncate capitalize cursor-pointer">
            {itemSerivceGroup?.name}
          </p>
        </button>
        {!isShow ? (
          <ChevronDownIcon width={14} />
        ) : (
          <ChevronUpIcon width={14} />
        )}
      </div>
      {isShow ? (
        itemSerivceGroup.services.map(
          (itemSerivce: any, indexSerivce: number) => {
            return (
              <div
                onClick={() => {
                  router.push(`/order?_id=${itemSerivce?._id}`);
                }}
                className="ml-5 p-2 border-l-1"
                key={indexSerivce}
              >
                <p className="pt-2 max-w-56 truncate cursor-pointer text-[#72777A]">
                  {itemSerivce?.serviceCode
                    ? getServiceName(itemSerivce.serviceCode)
                    : itemSerivce.name}
                </p>
              </div>
            );
          }
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};
