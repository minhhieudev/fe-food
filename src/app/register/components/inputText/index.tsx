"use client";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/assets/icon";

interface InputProp {
  placement?: any; // "outside" | "outside-left" | "inside";
  type: string; // kiểu của input
  label?: string; // nhẵn của imput
  placeholder?: string; // mô tả của input
  color?: any; //"default" | "danger" | "primary" | "secondary" | "success" | "warning" ===> màu của input
  className?: string; // class bên ngoài bao quanh của input
  classNameInput?: string; // class dành riêng cho input
  variants?: any; // "flat", "bordered", "underlined", "faded" ==> nếu chọn vào những thuộc tính kia thì đường viên của input sẽ thay đổi đậm nhạt
  radius?: any; // "full","lg","md","sm","none" ==> nếu chọn vào những thuôc tính kia thì bo góc cạnh của input sẽ thay đổi
  value?: string; // giá trị của input
  setValue?: any; //
  errorMessage?: string; // thông báo lỗi của input
  isRequired?: boolean; //  bắt buộc có dạng true hoặc false
  isInvalid?: boolean; // trường thay đổi màu của border input nếu bằng true thì border chuyển sang màu đỏ, bằng false trở lại ban đầu
  classNameLabel?: string; // class rieng danh cho Label
  flag: number; // nhận bết dùng loại input nào cho phù hợp VD: flag = 1 thì dùng input thường, nếu flag = 2 dùng input có thể ẩn và xem được text
  size?: any; // "md" | "sm" | "lg"
  onChange?: (e: any) => {};
  onKeyDown?: () => {};
  autoFocus?: boolean;
  disabled?: boolean;
}
const InputText = (props: InputProp) => {
  const {
    placement = "outside",
    type,
    label,
    placeholder,
    color = "default",
    classNameInput,
    className,
    variants = "bordered",
    radius = "sm",
    value,
    errorMessage,
    isRequired,
    isInvalid,
    classNameLabel = "text-[12px] leading-[20px] font-normal mb-2",
    flag = 1,
    size,
    onChange,
    onKeyDown,
    autoFocus,
    disabled,
  } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {flag === 1 ? (
        <div className={className}>
          <div className={classNameLabel}>{label}</div>
          <Input
            disabled={disabled}
            isRequired={isRequired}
            key={placement}
            type={type}
            labelPlacement={placement}
            placeholder={placeholder}
            color={color}
            className={classNameInput}
            variant={variants}
            radius={radius}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            size={size}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            autoFocus={autoFocus}
          />
        </div>
      ) : (
        <div className={className}>
          <div className={classNameLabel}>{label}</div>
          <Input
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={(e: any) => {
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            isRequired={isRequired}
            key={placement}
            labelPlacement={placement}
            placeholder={placeholder}
            color={color}
            className={classNameInput}
            variant={variants}
            radius={radius}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};

export default InputText;
