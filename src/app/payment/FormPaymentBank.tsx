"use client";
import React, { useEffect, useState } from "react";
import Images from "../asset";
import Image from "next/image";
import { Language } from "../utils/language/language";
import "./style.css";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { PaymentActions } from "@/modules/payment/slice";
import { toast } from "react-toastify";
import { CurrencyActions, CurrencySelector } from "@/modules/currency/slice";
import { formatPriceVND } from "../utils/units";

interface InfoDataBank{
  qrUrl: string,
  amount: number,
  syntax: string,
  bankInfo:{
    bankAccountName: string,
    bankAccountNumber: string,
    bankName: string
  }
}
export default function FormPaymentBank() {
  const lang = new Language(window);
  const dispatch = useAppDispatch();
  const [numberMany, setNumberMany] = useState<number>(10000)
  const [dataBank, setDataBank] = useState<InfoDataBank>()
  const [bankInfo, setBankInfo] = useState<InfoDataBank>()
  const [current, setCurrentUsd] = useState<string>("");
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  /*
    Người viết: Dinh Văn Thành
    Ngày viết: 22-05-2024
    Chức năng: call api lấy mã QR ngân hàng từ phía server
    Tham số truyền vào: số tiền của người nhập vào từ phía Ui
  */
  const handleCreateQR = () =>{
    setIsSubmitClicked(true);
    if (numberMany >= 10000){
      setShowWarning(false);
      dispatch(
        PaymentActions.getQrBank({
          numberMany:numberMany,
          onSuccess: (rs:any)=>{
            if(rs){
              setDataBank(rs.data)
            }
          },
          onFail:(rs:any) =>{
          }
        })
      )
    }
    else {
      setShowWarning(true);
    }
  }
  //Gọi lần đầu để lấy thông tin ngân hàng
  useEffect(()=>{
    dispatch(
      PaymentActions.getQrBank({
        numberMany:numberMany,
        onSuccess: (rs:any)=>{
          if(rs){
            setBankInfo(rs.data)
          }
        },
        onFail:(rs:any) =>{
        }
      })
    )
  }, [])
  /*====================== END ========================*/

  /*
    Nguời viết: Đinh văn thành
    Ngày viết: 24-05-2024
    Chức năng: (Call api lấy ra giá trị tiền tệ) => sửa lại lưu giá trị  xuống local Storage và lấy giá trị từ local Storage  
  */
  useEffect(()=>{
    const usd = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    if(usd.currencyUsd.code === 'USD'){
      setCurrentUsd(formatPriceVND(Number((1 / Number(usd.currencyUsd.exchangeRate)).toFixed(3))))
    };
  },[])

  useEffect(() => {
    if (isSubmitClicked && numberMany < 10000) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [numberMany]);

  const handleNumberChange = (event: any) => {
    const value = event.target.value;
    const intValue = Math.floor(Number(value));
    setNumberMany(intValue);
  };
  
  /*========================= END ==========================*/
  const data_describe = [
    {name: lang.gen("recharge.content-one")},
    {name: lang.gen("recharge.content-two")},
    {name: lang.gen("recharge.content-three")},
    {name: lang.gen("recharge.content-four") + " " +`${current}`},
  ]
  const data_describe_bank = [
    {
      key: lang.gen("recharge.account-name"),
      value: bankInfo?.bankInfo?.bankAccountName 
    },
    {
      key:lang.gen("recharge.bank"),
      value: bankInfo?.bankInfo.bankName
    },
    {
      key: lang.gen("recharge.account-number"),
      value: bankInfo?.bankInfo.bankAccountNumber
    },
    {
      key: lang.gen("recharge.content-bank"),
      value: bankInfo?.syntax 
    },
  ]

  return (
    <>
      <div className="border-1 border-gray-300 w-full rounded-[12px] p-[20px] justify-center items-center max-lg:hidden">
        <div className="flex gap-[20px]">
          <div className="border border-red w-full h-[399px] rounded-[12px] p-[20px] border-[#E3E5E5]">
              <div>
                <label className="font-normal text-[16px] leading-[24px] text-[#090A0A]">{lang.gen("recharge.label-money-number")}</label>
                <div className="flex gap-3">
                  <div className="flex w-4/5 border border-[#E3E5E5] justify-between px-[16px] py-[8px] rounded-[0.6px]">
                    <input value={numberMany === 0 ? '' : numberMany} onChange={handleNumberChange} type="number" className="w-full h-auto border-none input-number" min={1} placeholder={lang.gen("recharge.input-money-number")}/> 
                    <p>VND</p>
                  </div>
                  <div
                    onClick={(e:any)=>{handleCreateQR(); setIsSubmitClicked(false);}}
                    className={lang.gen('recharge.generate-qr') == 'Generate QR codes' ? "px-[16px] py-[10px] rounded-[4px] w-48 border border-[#FF8900] bg-[#FF8900] create-qr-font-size-en text-[16px] text-[#FFFFFF] leading-[20px] font-bold cursor-pointer" : 
                    "px-[16px] py-[10px] rounded-[4px] border border-[#FF8900] create-qr-font-size bg-[#FF8900] text-[16px] text-[#FFFFFF] leading-[20px] font-bold cursor-pointer"}>{lang.gen("recharge.generate-qr")}</div>
                </div>
                {showWarning && (
                  <span className="text-[12px] text-red-600">{lang.gen("recharge.error-input-number-many")}</span>
                )}
              </div>
              <div className="mt-4">
                {dataBank?.qrUrl ? <img src={dataBank?.qrUrl} alt=""  className="w-[250px] h-[250px]"/> : <Image src = {Images.imagIcon} alt = ''/>}
              </div>
          </div>
          <div className="border border-red w-full h-[399px] rounded-[12px] p-[20px] ">
            {data_describe?.map((e:any, index: number) =>{
                return(
                  <ul className="list-disc pl-[20px]" key={index}>
                    <li className="text-[14px] leading-[20px] font-normal text-[#000000]">{e.name}</li>
                  </ul>
                )
              })}
              <div className="mt-44 describe-bank">
                {data_describe_bank?.map((e:any, index: number) =>{
                    return(
                      <div className="p-1" key={index}>
                        <p className="font-normal text-[16px] leading-[20px] text-[#000000]">{e.key}  <span className="text-[#FF8900] font-bold text-[16px] leading-[20px]">{e.value}</span></p>
                      </div>
                    )
                })}
              </div>
          </div>
        </div>
        <p className="font-normal text-[12px] leading-[24px] text-[#979C9E] mt-3">{lang.gen("recharge.warning")}</p>
      </div>
      {/* ---------------------------------- RESPONSIVE ---------------------------------- */}

      <div className="hidden max-lg:flex border-1 gap-[20px] border-gray-300 w-full rounded-[12px] p-[20px] justify-center items-center flex-col">
        <div className="w-full">
          <div className="border border-red w-full h-[399px] rounded-[12px] p-[20px] border-[#E3E5E5] mb-[20px]">
              <div>
                <label className="font-normal text-[16px] leading-[24px] text-[#090A0A]">{lang.gen("recharge.label-money-number")}</label>
                <div className="flex gap-3">
                  <div className="flex w-4/5 border border-[#E3E5E5] justify-between px-[16px] py-[8px] rounded-[0.6px]">
                    <input value={numberMany} onChange={(event:any) =>{setNumberMany(Number(event.target.value))}} type="number" className="w-full h-auto border-none input-number" min={1} placeholder={lang.gen("recharge.input-money-number")}/> 
                    <p>VND</p>
                  </div>
                  <div
                    onClick={(e:any)=>{handleCreateQR(); setIsSubmitClicked(false);}}
                    className={lang.gen('recharge.generate-qr') == 'Generate QR codes' ? "px-[16px] py-[10px] create-qr-font-size-en rounded-[4px] w-2/5 border border-[#FF8900] bg-[#FF8900] text-[16px] text-[#FFFFFF] leading-[20px] font-bold cursor-pointer" : 
                    "px-[16px] py-[10px] rounded-[4px] create-qr-font-size border border-[#FF8900] bg-[#FF8900] text-[16px] text-[#FFFFFF] leading-[20px] font-bold cursor-pointer"}>{lang.gen("recharge.generate-qr")}</div>
                </div>
                {showWarning && (
                  <span className="text-[12px] text-red-600">{lang.gen("recharge.error-input-number-many")}</span>
                )}
              </div>
              <div className="mt-4">
                <img src={dataBank?.qrUrl} alt=""  className="w-[250px] h-[250px]"/>
              </div>
          </div>
          <div className="border border-red w-full h-[399px] rounded-[12px] p-[20px] ">
            {data_describe?.map((e:any, index: number) =>{
                return(
                  <ul className="list-disc pl-[20px]" key={index}>
                    <li className="text-[14px] leading-[20px] font-normal text-[#000000]">{e.name}</li>
                  </ul>
                )
              })}
              <div className="mt-44 describe-bank">
                {data_describe_bank?.map((e:any, index: number) =>{
                    return(
                      <div className="p-1" key={index}>
                        <p className="font-normal text-[16px] leading-[20px] text-[#000000]">{e.key}  <span className="text-[#FF8900] font-bold text-[16px] leading-[20px]">{e.value}</span></p>
                      </div>
                    )
                })}
              </div>
          </div>
        </div>
        <p className="font-normal text-[12px] leading-[24px] text-[#979C9E]">{lang.gen("recharge.warning")}</p>
      </div>
    </>
  );
}
