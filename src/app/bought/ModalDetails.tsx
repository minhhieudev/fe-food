"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import Images from "../asset";
import { formatPriceVND } from "../utils/units";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/core/services/hook";
import { ServiceOrderActions } from "@/modules/services.order/slice";
interface Props {
  isOpen?: boolean;
  handleClose?: () => void;
  data?: any;
}
export default function ModalDetails(props: Props) {
  const { isOpen, handleClose, data } = props;
  const dispatch = useAppDispatch();
  const [dataFet, setDataFet] = useState<any>();
  useEffect(() => {
    dispatch(
      ServiceOrderActions.getOrderById({
        id: data?._id,
        onSuccess: (rs: any) => {
          setDataFet(rs?.data?.order);
        },
      })
    );
  }, [data]);

  const titleList = [
    {
      title: "Dịch vụ",
      des: dataFet?.servicePackage?.name,
      class: "font-bold text-[#404446]",
    },
    {
      title: "Đơn giá",
      des: dataFet?.servicePackage?.price,
    },
    {
      title: "Trạng thái",
      des: dataFet?.status == "running" ? "Đang chạy" : "Đang chờ",
      class: "text-[#FF8900]",
    },
    {
      title: "Số lượng",
      des: dataFet?.servicePackage?.qty,
    },
    {
      title: "Thành tiền",
      des: formatPriceVND(dataFet?.totalPrice),
    },
  ];
  let d = new Date(dataFet?.createdAt);
  let time =
    d.getHours() +
    ":" +
    d.getMinutes() +
    "   " +
    d.getDate() +
    "-" +
    "" +
    (d.getMonth() + 1) +
    "-" +
    d.getFullYear();

  return (
    <div>
      <Modal
        className="p-[10px]"
        onClose={handleClose}
        isOpen={isOpen}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex w-full justify-between items-center">
                <Image src={Images.logoMSTName} alt="logo" height={60} />
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 items-center">
                    <p>Mã dịch vụ #</p>
                    <p className="bg-[#F2F4F5] h-full p-[2px]">
                      {dataFet?.servicePackage?.code}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-end items-center">
                    <p className="text-[#72777A] font-normal text-[14px]">
                      Trạng thái:{" "}
                    </p>
                    <p className="px-3 py-1 rounded-[4px] bg-[#FFEFDD] text-[#FF8900] font-normal text-[14px]">
                      {data?.action === "action" ? "Đang chạy" : "Đang chờ"}
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between items-start">
                  <Image src={Images.qr2} alt="qr" width={200} />
                  <div className="flex gap-1 items-center">
                    <p className="text-[#72777A]">Ngày mua: </p>
                    <p className="bg-[#F2F4F5] h-full p-[2px]">{time}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-bold text-[16px]">Khách hàng</p>
                  <p className="text-[#72777A] text-[14px] font-bold">
                    {dataFet?.customer?.username}
                  </p>
                  <p className="text-[#72777A] text-[14px] font-bold">
                    {dataFet?.customer?._id}
                  </p>
                </div>
                <div className="py-[20px] flex flex-col gap-2 border-b-1 border-gray-200 pb-[24px]">
                  <div className="text-[14px] flex w-full justify-between text-[#72777A]">
                    {titleList?.map((item: any, index: number) => {
                      return (
                        <div key={index} className={index == 0 ? "mr-20" : ""}>
                          <div className="flex flex-col gap-1">
                            <p>{item?.title}</p>
                            <p className={item?.class}>{item?.des}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between text-[#72777A] text-[14px] items-start border-b-1 border-gray-200 pb-[24px]">
                  <div className="flex gap-1 items-center">
                    <p className="text-[#72777A]">Thanh toán: </p>
                    <p className="p-1 bg-[#F2F4F5] text-[black]">
                      Thanh toán qua ngân hàng
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <div className="flex gap-20 w-[280px] justify-between">
                      <p>Tổng tiền sản phẩm</p>
                      <p className="text-[black] font-bold">
                        {formatPriceVND(dataFet?.totalPrice)}
                      </p>
                    </div>
                    <div className="flex gap-20 w-[280px] justify-between">
                      <p>Giảm giá</p>
                      <p className="text-[black] font-bold">0</p>
                    </div>
                    <div className="flex gap-20 w-[280px] justify-between">
                      <p>Tổng thanh toán</p>
                      <p className="text-[#FF8900] font-bold">
                        {formatPriceVND(dataFet?.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="flex gap-[8px] bg-[#fff] border-1 border-gray-200 rounded-[6px]"
                >
                  <XMarkIcon width={16} />
                  <p className="text-[#72777A] font-bold text-[16px]">Đóng</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
