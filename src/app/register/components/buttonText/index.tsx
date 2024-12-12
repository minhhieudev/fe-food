import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";

interface ButtonProp extends ButtonProps {
  className?: any;
  isDisabled?: boolean;
  size?: any; //"sm" | "md" | "lg"
  radius?: any; //"md" | "sm" | "lg" | "none" | "full"
  title: string;
  iconStart?: any;
  iconEnd?: any;
}
const ButtonText = (props: ButtonProp) => {
  const {
    className = "w-full h-[44px] bg-black text-white login-container-button-child-one",
    isDisabled,
    size = "md",
    radius = "sm",
    title,
    iconStart,
    iconEnd,
    ...otherProps
  } = props;
  return (
    <Button
      className={className}
      isDisabled={isDisabled}
      size={size}
      radius={radius}
      startContent={iconStart}
      endContent={iconEnd}
      {...otherProps}
    >
      {title}
    </Button>
  );
};

export default ButtonText;
