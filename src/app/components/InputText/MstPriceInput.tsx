import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, InputProps } from "@nextui-org/react";

interface MstPriceInputProps extends InputProps {
  onChange?: any;
  className?: string;
  props?: InputProps;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  onBlur?: any;
  value?: any;
  fontSize?: number;
}

const MstPriceInput: React.FC<MstPriceInputProps> = ({
  onChange = () => {},
  label = "",
  className = "",
  placeholder = "",
  isError,
  onBlur,
  value,
  fontSize,
  ...props
}) => {
  const [amount, setAmount] = useState("");
  useEffect(() => {
    if (value) {
      setAmount(value?.toLocaleString("vi-VN"));
    }
  }, [value]);

  const handleInputChange = (event: any) => {
    // When user selects text in the document, also abort.
    // When the arrow keys are pressed, abort.
    if ([38, 40, 37, 39].includes(event.keyCode)) {
      return;
    }
    const inputValue = event.target.value.replace(/[\D\s\._\-]+/g, "");
    const parsedValue = inputValue ? parseInt(inputValue, 10) : 0;
    setAmount(parsedValue.toLocaleString("vi-VN"));
  };

  const handleSubmit = () => {
    // Đầu ra cuối cùng của dữ liệu
    const sanitizedAmount = parseInt(amount.replace(/[($)\s\._\-,]+/g, ""), 10);
    onChange(sanitizedAmount);
  };

  const ref = useRef<any>(null);
  const errorMessageName = useMemo(() => {
    if (ref.current?.type == "number" || !ref?.current) {
      return "Xin vui lòng nhập " + label.toLocaleLowerCase();
    }
    if (value)
      return "Xin vui lòng không để trống" + label.toLocaleLowerCase() + "!";
    return;
  }, [label, value]);
  // style khi focus
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
      ref={ref}
      label={label}
      classNames={{
        label: "text-[#090A0A] text-base",
        input: ["bg-transparent"],
        innerWrapper: "bg-transparent shadow-none",
        inputWrapper: ["bg-white", borderColor, "shadow-none", "rounded  "],
        base: [
          "data-[has-label=true]:mt-[30px]",
          `${fontSize ? "text-[" + fontSize + "px]" : "text-base"}`,
        ],
      }}
      labelPlacement="outside"
      placeholder={placeholder}
      onChange={handleInputChange}
      onBlur={() => handleSubmit()}
      errorMessage={isError && errorMessageName}
      value={amount}
      maxLength={15}
      type="string"
      {...props}
    />
  );
};

export default MstPriceInput;
