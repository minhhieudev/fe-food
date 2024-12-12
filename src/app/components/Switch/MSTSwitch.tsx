import { Switch, SwitchProps, cn } from "@nextui-org/react";
import React from "react";

interface MstSwitchProps extends SwitchProps {
  onValueChange?: (isSelected: boolean) => void;
  isSelected?: boolean;
  props?: SwitchProps;
}

const MstSwitch: React.FC<MstSwitchProps> = ({
  onValueChange,
  isSelected,
  ...props
}) => {
  return (
    <Switch
      onValueChange={onValueChange}
      isSelected={isSelected}
      aria-label="Automatic updates"
      {...props}
      classNames={{
        wrapper: cn(
          "overflow-visible",
          "group-data-[pressed=true]:bg-[#ff8900]",
          "group-data-[selected=true]:bg-[#ff8900]"
        ),
        thumb: cn(
          "group-data-[hover=true]:border-primary",
          // pressed
          "group-data-[pressed=true]:bg-white",
          "bg-white"
        ),
      }}
    />
  );
};

export default MstSwitch;
