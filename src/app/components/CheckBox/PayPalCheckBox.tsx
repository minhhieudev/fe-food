import React from "react";
interface Props {
  isChecked?: boolean;
  handleCheckBox?: () => void;
}
export default function PayPalCheckBox(props: Props) {
  const { isChecked, handleCheckBox } = props;
  return (
    <div
      className="w-[18px] h-[18px] rounded-[21px] border-1 border-[#2790C3] justify-center items-center cursor-pointer flex"
      onClick={handleCheckBox}
    >
      {isChecked ? (
        <div className="w-[14px] h-[14px] rounded-[14px] bg-[#2790C3] justify-center items-center"></div>
      ) : (
        <></>
      )}
    </div>
  );
}
