import React from "react";
import { Progress } from "@nextui-org/react";
import Image from "next/image";
import Logo from "../../app/asset/images/logoName.png";
function Loading() {
  return (
    <div className="py-9 text-center w-[200px]">
      <Image
        src={Logo}
        style={{
          borderRadius: 10,
          width: 200,
        }}
        alt={""}
        width={200}
        height={200}
        priority
      />
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
        color="warning"
        style={{ borderRadius: 10 }}
      />
    </div>
  );
}

export default Loading;
