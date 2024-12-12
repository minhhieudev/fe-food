import MediaCardComponent from "@/app/keyword/components/MediaCardComponent";
import { useState } from "react";

function MediaHot() {
  const [current, setCurrent] = useState(0);

  const dataTopics = [
    {
      name: "Nội dung nổi bật",
    },
    {
      name: "Nội dung từ chủ đề đã theo dõi",
    },
  ];

  return (
    <div className="flex flex-col col-span-4 md:col-span-3">
      <div className="flex gap-2">
        {dataTopics.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={
                current == index
                  ? "text-[black] px-[10px] py-[4px] bg-[#fff] rounded-[20px] cursor-pointer"
                  : "text-[#fff] px-[10px] py-[4px] bg-custom-rgba rounded-[20px] cursor-pointer"
              }
              onClick={() => setCurrent(index)}
            >
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {[1, 2, 3].map((x, index) => {
          return (
            <MediaCardComponent
              platform="youtube"
              className="col-span-3 md:col-span-1 flex bg-red"
              key={`${index}`}
              width={"100%"}
              height={"200"}
              id={"VIq5ozTldZE"}
              classForIframe="border-2 border-white rounded-[12px]"
            />
          );
        })}
      </div>
      <div className="mt-[25px] grid grid-cols-3 gap-2">
        {[1, 2, 3].map((x, index) => {
          return (
            <MediaCardComponent
              className="col-span-3 md:col-span-1"
              platform="tiktok"
              key={`${index}`}
              width={"100%"}
              height={"768px"}
              id={"7370975559926566152"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MediaHot;
