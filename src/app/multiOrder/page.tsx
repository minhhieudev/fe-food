import React from "react";
import { Button, Switch, Textarea } from "@nextui-org/react";
import TextInput from "../components/InputText";
import { ClockIcon } from "@heroicons/react/24/outline";
export default function MultiOrder() {
  return (
    <div className="flex p-[20px] flex-col gap-3">
      <p className=" font-bold">
        Nhập mỗi đơn hàng là một dòng theo định dạng bên dưới
      </p>
      <Textarea
        placeholder="service_id | link | quantity"
        className="border-1 border-gray-300 rounded-[12px] bg-[#E3E5E5]"
      />
      <div className="flex gap-1 items-center">
        <Switch isSelected={true} />
        <p>Thời gian cách nhau mỗi lần chạy</p>
      </div>
      <TextInput
        placeholder="09:00:00"
        endContent={
          <div>
            <ClockIcon width={20} />
          </div>
        }
      />
      <Button className="rounded-[4px] bg-[#FF8900] text-[#fff]">
        Đặt hàng
      </Button>
    </div>
  );
}
