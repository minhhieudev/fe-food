"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, InputProps } from "@nextui-org/react";

interface MstTextInputProps extends InputProps {
  onChange?: any;
  className?: string;
  props?: InputProps;
  label?: string;
  search?: string;
  placeholder?: string;
  isError?: boolean;
  onBlur?: any;
  fontSize?: number;
  type?: string;
  endContent?: any;
}

const TextInput: React.FC<any> = ({
  onChange = () => {},
  label = "",
  className = "",
  placeholder = "",
  isError,
  onBlur,
  fontSize,
  type,
  endContent,
  search,
  removeBorder,
  classNames = {},
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
  const border = removeBorder ? "border-0" : "border"
  const [borderColor, setBorderColor] = useState(border);
  useEffect(() => {
    const inputElement = ref.current;

    const addFocusBorder = () => {
      setBorderColor(removeBorder ? "border-0": "border-[1px] border-[#FF8900]");
    };

    const removeFocusBorder = () => {
      setBorderColor(border);
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
        label: ["text-[#090A0A] text-base", ...(classNames.label || [])],
        input: ["bg-transparent", ...(classNames.input || [])],
        innerWrapper: ["bg-transparent shadow-none", ...(classNames.innerWrapper || [])],
        inputWrapper: ["bg-white", borderColor, "shadow-none", "rounded", ...(classNames.inputWrapper || [])],
        base: [
          "data-[has-label=true]:mt-[30px]",
          `${fontSize ? "text-[" + fontSize + "px]" : "text-base"}`,
          ...(classNames.base || [])
        ],
      }}
      labelPlacement="outside"
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      errorMessage={isError && errorMessageName}
      {...props}
      endContent={<>{endContent}</>}
      value={search}
      onValueChange={props.onChangeText}
    />
  );
};

export default TextInput;
