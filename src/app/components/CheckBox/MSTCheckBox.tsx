"use client";
import { ReactNode, createContext, useContext } from "react";
import { motion } from "framer-motion";

interface CheckboxContextProps {
  id: string;
  isChecked: boolean;
  onChange?: (isChecked: boolean) => void;
  radius?: string;
  typeIcon?: "indicator" | "decrement";
}

const CheckboxContext = createContext<CheckboxContextProps>({
  id: "",
  isChecked: false,
  onChange: () => {},
  radius: "md",
  typeIcon: "indicator",
});

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface CheckboxProps {
  children: ReactNode;
  id?: string;
  onChange?: (isChecked: boolean) => void;
  isChecked: boolean;
  radius?: string;
  typeIcon?: "indicator" | "decrement";
}

export default function MstCheckbox({
  children,
  id = generateUniqueId(),
  onChange,
  isChecked,
  radius = "rounded-[4px]",
  typeIcon = "indicator",
}: CheckboxProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <CheckboxContext.Provider
          value={{
            id,
            isChecked,
            onChange,
            radius,
            typeIcon,
          }}
        >
          {children}
        </CheckboxContext.Provider>
      </div>
    </div>
  );
}
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
function CheckboxIndicator() {
  const { id, isChecked, onChange, radius, typeIcon } =
    useContext(CheckboxContext);

  return (
    <button className="relative flex items-center">
      <input
        type="checkbox"
        className={`border-blue-gray-200 relative h-5 w-5 cursor-pointer  appearance-none border-2 transition-all duration-500 checked:border-[#ff8900] checked:bg-[#ff8900] ${radius}`}
        checked={isChecked}
        onChange={(e) => {
          onChange && onChange(e.target?.checked);
        }}
        id={id}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
          stroke="currentColor"
          className="h-3.5 w-3.5"
          initial={false}
          animate={isChecked ? "checked" : "unchecked"}
        >
          {typeIcon == "indicator" ? (
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
              variants={tickVariants}
            />
          ) : (
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
              variants={tickVariants}
            />
          )}
        </motion.svg>
      </div>
    </button>
  );
}

MstCheckbox.Indicator = CheckboxIndicator;

interface CheckboxLabelProps {
  children: ReactNode;
}

function CheckboxLabel({ children }: CheckboxLabelProps) {
  const { id, isChecked } = useContext(CheckboxContext);

  return (
    <motion.label
      className="relative ml-2 overflow-hidden text-sm "
      htmlFor={id}
      animate={{
        x: isChecked ? [0, -4, 0] : [0, 4, 0],
        color: isChecked ? "#a1a1aa" : "#27272a",
        textDecorationLine: isChecked ? "" : "none",
      }}
      initial={false}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.label>
  );
}

MstCheckbox.Label = CheckboxLabel;
