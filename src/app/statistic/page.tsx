"use client";
import React, { useEffect } from "react";
import Infor from "../payment/Informations";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  ServicePackageActions,
  ServicePackageSelectors,
} from "@/modules/services.package/slice";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import ItemList from "./ItemList";
import ShowTitle from "../components/ShowTitle";
import { Language } from "../utils/language/language";
export default function Statistic() {
  const router = useRouter();
  const lang = new Language(window);
  const dispatch = useAppDispatch();
  const dataHot = useAppSelector(ServicePackageSelectors.servicePackageHot);
  useEffect(() => {
    dispatch(ServicePackageActions.getServicePackageHot({}));
  }, []);

  return (
    <div className="">
      <ShowTitle title={lang.gen("statistical.title")} />
      <div className="flex p-[20px] flex-col gap-[20px] border border-[#E3E5E6] rounded-[12px]">
        {" "}
        <div className="flex justify-between w-full items-center">
          <Infor isShowInfo={false} />
          <div
            className="flex bg-[#FF8900] rounded-[4px] items-center justify-center w-[120px] h-[44px] cursor-pointer gap-2 px-[16px]"
            onClick={() => {
              router.push("/payment", {});
            }}
          >
            <CurrencyDollarIcon width={20} color="#fff" />
            <p className="text-[#fff]">Nạp tiền</p>
          </div>
        </div>
        <ItemList data={dataHot && dataHot?.data?.servicePackages} />
      </div>
    </div>
  );
}
