"use client";

import { SelectServiceName } from "@/app/order/ultis";
import { useEffect, useRef, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Language } from "../../../utils/language/language";
import moment from "moment";

interface Props {
  title?: string;
  icon?: Element;
  width?: any;
  name?: string;
  isChildren?: boolean;
  handlePicker?: (e: any) => void;
  code?: string;
  start: any
}

export default function DropDownTimeTemplate(props: Props) {
  const { title, width, handlePicker = () => {}, code, start } = props;
  const [currentServices, setCurrentServices] = useState(0);
  const [showDrop, setShowDrop] = useState(true);
  const btnRef: any = useRef();
  const [value, setValue] = useState<any>("");
  const lang = new Language(window);

  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!btnRef.current?.contains(e.target)) {
        setShowDrop(false);
      }
    });
  }, []);
  useEffect(() => {
    if (code) {
      SelectServiceName.map((item: any, index: number) => {
        if (code === item.code) {
          setCurrentServices(index);
        }
      });
    }
  }, [code]);

  const handleValueChange = (newValue: any) => {
    if (newValue) {
      setValue(newValue);
      handlePicker({
        startDate: moment(newValue.startDate).format("YYYY-MM-DD"), 
        endDate: moment(newValue.endDate).format("YYYY-MM-DD")
      });
    }
  };
  useEffect(()=>{
    if(!start){
      setValue({startDate: null, endDate: null})
    }
  }, [start])

  return (
    <div className="flex flex-col w-full h-[43px] border-gray-300 border-1 rounded-t-[4px] cursor-pointer">
      <div className="relative z-20 flex gap-1">
        <p className=" mt-2 ml-3 text-ellipsis w-[150px] whitespace-nowrap overflow-hidden">
          {lang.gen("bought.purchase-date")}
        </p>
        <div className="w-[240px] mb-1">
          <Datepicker value={value} placeholder="DD-MM-YYYY ~ DD-MM-YYYY" displayFormat="DD-MM-YYYY" onChange={handleValueChange} />
        </div>
      </div>
    </div>
  );
}
