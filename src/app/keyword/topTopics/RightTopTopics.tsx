import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { TopicActions, TopicSelectors } from "@/modules/topic/slice";
import { useEffect, useState } from "react";
import OneTopicBtn from "./topicItem/OneTopicBtn";
import WatchMoreBtn from "./topicItem/WatchMoreBtn";

export default function RightTopTopics(props: any) {
  const [hidden, setHidden] = useState(true);
  const dispatch = useAppDispatch();
  const topicList = useAppSelector(TopicSelectors.topicList);

  useEffect(() => {
    dispatch(TopicActions.getTopicList({}));
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-lg:mt-[46px] flex-col grid lg:w-[70%] lg:grid-cols-3 lg:gap-7 lg:items-center max-lg:grid-cols-2 max-lg:gap-5 max-lg:justify-center">
        {topicList?.map((item: any, index: number) => {
          if (index <= 10) {
            return (
              <OneTopicBtn
                key={`${index}`}
                setHidden={setHidden}
                index={index}
                item={item}
                hidden={hidden}
              />
            );
          }
        })}
        {topicList.length > 0 && <WatchMoreBtn />}
      </div>
    </div>
  );
}
