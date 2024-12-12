"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, InputProps } from "@nextui-org/react";

interface MstTextInputProps extends InputProps {
  onChange?: any;
  className?: string;
  props?: InputProps;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  onBlur?: any;
  fontSize?: number;
}

const TextInputWithPass: React.FC<MstTextInputProps> = ({
  onChange = () => {},
  label = "",
  className = "",
  placeholder = "",
  isError,
  onBlur,
  fontSize,
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
  const [showPass, setShowPass] = useState(false);
  return (
    <Input
      ref={ref}
      label={label}
      classNames={{
        label: ["text-[#090A0A] text-base"],
        input: ["bg-transparent"],
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
      type={showPass ? "" : "password"}
      endContent={
        <p
          className="text-[#2790C3] text-[14px] cursor-pointer"
          onClick={() => {
            setShowPass(!showPass);
          }}
        >
          Show
        </p>
      }
    />
  );
};

export default TextInputWithPass;
