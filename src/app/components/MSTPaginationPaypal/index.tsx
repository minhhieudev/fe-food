import React from "react";
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
  cn,
  PaginationProps,
} from "@nextui-org/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

interface Props extends PaginationProps {
  total: number;
  onChange: (_param: number) => void;
  page: number;
}
export default function MSTPaginationPaypal({
  total = 1,
  onChange,
  page,
  ...props
}: Props) {
  const renderItem = ({
    ref,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
    index,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <div
          className={cn(
            className,
            "bg-default-200/50 min-w-8 w-8 h-8 cursor-pointer"
          )}
          onClick={onNext}
          key={index}
        >
          <ChevronLeftIcon width={16} className="rotate-180" />
        </div>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <div
          className={cn(
            className,
            "bg-default-200/50 min-w-8 w-8 h-8 cursor-pointer"
          )}
          onClick={onPrevious}
          key={index}
        >
          <ChevronLeftIcon width={16} />
        </div>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <div key={index} className={className}>
          ...
        </div>
      );
    }

    // cursor is the default item
    return (
      <div
        key={index}
        ref={ref}
        className={cn(
          className,
          isActive
            ? "text-white bg-gradient-to-br bg-white from-[#ff8900] to-[#ff8900] font-bold rounded-none"
            : "",
          "cursor-pointer"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </div>
    );
  };
  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={total}
      initialPage={1}
      onChange={onChange}
      page={page}
      className="gap-2 rounded-sm"
      renderItem={renderItem}
      variant="light"
      {...props}
    />
  );
}
