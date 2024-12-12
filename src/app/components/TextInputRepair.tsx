import { Input, InputProps } from "@nextui-org/react";

interface TextInputRepairProps extends InputProps {
  label: string;
}

export default function TextInputRepair({ label, ...props }: TextInputRepairProps) {
  return (
    <Input
      label={label}
      variant="bordered"
      {...props}
    />
  );
} 