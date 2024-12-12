"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, InputProps } from "@nextui-org/react";

interface MstTextInputProps extends InputProps {
  onChange?: any;
  className?: string;
  props?: InputProps;
  label?: string;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  onBlur?: any;
  fontSize?: number;
  type?: string;
  endContent?: any;
}

const TextInputRepair: React.FC<any> = ({
  onChange = () => {},
  label = "",
  className = "",
  placeholder = "",
  isError,
  onBlur,
  fontSize,
  type,
  endContent,
  value,
  ...props
}) => {
  const ref = useRef<any>(null);
  const isWhitespaceOrEmpty = (str?: string) => {
    if (str === undefined || str === null) return true;
    return /^\s*$/.test(str);
  };
  const errorMessageName = useMemo(() => {
    if (ref.current?.type == "number" || !ref?.current) {
      return "Xin vui lòng nhập " + label.toLocaleLowerCase();
    }
    if (isWhitespaceOrEmpty(props?.value))
      return "Xin vui lòng không để trống " + label.toLocaleLowerCase() + "!";

    return;
  }, [label, props?.value]);

  const [borderColor, setBorderColor] = useState("border");
  useEffect(() => {
    const inputElement = ref.current;

    const addFocusBorder = () => {
      setBorderColor("border-[1px] border-[#FF8900]");
    };

    const removeFocusBorder = () => {
      setBorderColor("border");
    };

    inputElement.addEventListener("focus", addFocusBorder);
    inputElement.addEventListener("blur", removeFocusBorder);

    return () => {
      inputElement.removeEventListener("focus", addFocusBorder);
      inputElement.removeEventListener("blur", removeFocusBorder);
    };
  }, []);

  return (
    <Input
      type={type}
      ref={ref}
      label={label}
      classNames={{
        label: ["text-[#090A0A] text-[16px] leading-[24px] font-norma"],
        input: ["bg-transparent px-[8px] py-[16px]"],
        innerWrapper: "bg-transparent shadow-none",
        inputWrapper: ["bg-white", borderColor, "shadow-none", "rounded"],
        base: [
          "data-[has-label=true]:mt-[30px]",
          `${fontSize ? "text-[" + fontSize + "px]" : "text-base"}`,
        ],
      }}
      labelPlacement="outside"
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      errorMessage={isError && errorMessageName}
      {...props}
      endContent={<>{endContent}</>}
      value={value }
    />
  );
};

export default TextInputRepair;
