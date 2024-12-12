"use client";
import React, { useEffect, useState } from "react";
import bg from "../../asset/images/bgKeyFollow.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ModalKeyFollow from "../components/modals/ModalKeyFollow";
import { KeywordActions, KeywordSelectors } from "@/modules/keyword/slice";
import { useAppDispatch } from "@/core/services/hook";
import { useSelector } from "react-redux";
import TableKeyFollow from "../components/TableKeyFollow";
export default function MyKeywordSection() {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const data = useSelector(KeywordSelectors.keyFollowedFirst);

  useEffect(() => {
    dispatch(KeywordActions.getKeyFollowedFirst({}));
  }, []);

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <div
      className="rounded-[12px] mt-[100px] md:p-[24px] mb-[50px]"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
      }}
    >
      <ModalKeyFollow isOpen={isShowModal} handleClose={handleClose} />
      <div className="bg-[#fff] rounded-[12px] p-[12px] pb-6">
        <p className="items-center py-1 bg-[#FFAA47] rounded-3xl text-[#fff] text-[18px] pl-6">
          TỪ KHOÁ ĐANG THEO DÕI
        </p>
        <TableKeyFollow dataList={data ? data : []} />
        {data?.keywords?.length > 0 && (
          <div
            className="mt-[20px] text-[#fff] bg-[#FF8900] rounded-[4px] px-4 py-[4px] flex justify-center items-center gap-2 cursor-pointer max-w-[250px]"
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            <p>Xem thêm</p>
            <ChevronDownIcon color="#fff" width={20} height={20} />
          </div>
        )}
      </div>
    </div>
  );
}
