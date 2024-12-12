import { Language } from "@/app/utils/language/language";
import React from "react";
interface Props {
  checkEmpty?: boolean;
  data?: any;
  itemCheck?: any;
  dataCheck?: any;
}
export default function CheckEmptyInput(props: Props) {
  const lang = new Language(window);
  const { checkEmpty, data, itemCheck, dataCheck } = props;

  return (
    <div>
      {dataCheck?.map((item: any, index: number) => {
        if (
          itemCheck.code === item.attributeCode &&
          item?.check === true &&
          itemCheck?.required === true &&
          item.enteredValue == ""
        ) {
          return (
            <p className="text-[14px] pt-1 text-[#FF8900]" key={index}>
              {itemCheck?.label} {lang.gen("order.notBlank")}
            </p>
          );
        }
      })}
    </div>
  );
}
