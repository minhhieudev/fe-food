"use client";
import { useAppDispatch } from "@/core/services/hook";
import { TopicActions } from "@/modules/topic/slice";
import { useEffect } from "react";
import Contents from "./components/Contents";
import HeaderKeyTool from "./components/HeaderKeyTool";

export default function KeyWord() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(TopicActions.getTopicByCustomer({}));
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-20">
        <HeaderKeyTool />
      </div>
      <Contents />
    </div>
  );
}
