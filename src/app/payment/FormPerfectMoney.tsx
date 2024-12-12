import React, { useState } from "react";
import TextInput from "../components/InputText";
import PerfectMoney from "./PerfectMoney";

function FormPerfectMoney() {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <div className="flex p-[20px] border-1 border-gray-300 rounded-[12px] flex-col gap-3">
        <TextInput
          onChange={(e: any) => setAmount(e.target.value)}
          label={"Nhập số tiền"}
          type="number"
          endContent={<>USD</>}
          placeholder={"Nhập số tiền"}
          value={amount}
        />
        <PerfectMoney amount={amount} />
      </div>
    </div>
  );
}

export default FormPerfectMoney;
