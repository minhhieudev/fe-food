"use client";
import LeftTopTopics from "./LeftTopTopics";
import RightTopTopics from "./RightTopTopics";

export default function TopTopics() {
  return (
    <div className="flex flex-col w-full justify-center pt-10 max-md:pt-5">
      <div className="flex lg:bg-[url('/bgTopics.png')] lg:bg-cover max-lg:flex-col w-full relative lg:h-[550px] lg:rounded-[24px] lg:py-[100px] lg:px-[50px]">
        <LeftTopTopics />
        <RightTopTopics />
      </div>
    </div>
  );
}
