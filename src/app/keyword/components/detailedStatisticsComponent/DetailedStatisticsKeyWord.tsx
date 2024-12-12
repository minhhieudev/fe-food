/*
  Người viết: Đinh văn thành
  Ngày viết: 03-06-2024
  Chức năng: thống kê các thông tin theo từ khóa đa chọn
  Param: id là mã của từ khóa muốn tìm kiếm
        OnHide: là một hàm để đóng hoặc mở modal 
*/

import CONST from "@/core/services/const";
import React from "react";
import { useAppDispatch } from "@/core/services/hook";
import { TopicActions } from "@/modules/topic/slice";
import { useCallback, useEffect, useState } from "react";
import "../../keyword.css";
import { Language } from "@/app/utils/language/language";
import CloseIcon from "../../icons/CloseIcon";
import DetailedStatistics from "./component/DetailedStatistics";

type DetailedStatisticKeyWordProps = {
  onHide: () => void;
  id: string;
};
export default function DetailedStatisticsKeyWordComponent({
  onHide,
  id,
}: DetailedStatisticKeyWordProps) {
  const imageURL = `${CONST.REQUEST.API_ADDRESS}/images/services/`;
  const dispatch = useAppDispatch();

  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const [topicDetail, setTopicDetail] = useState<any>(undefined);

  const lang = new Language(window);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCurrentHeight(window.innerHeight);
      setCurrentWidth(window.innerWidth);
    });
  }, []);

  const onFollow = (idTopic: string) => {
    dispatch(
      TopicActions.followKeyWord({
        id: idTopic,
        onSuccess: getDetail,
      })
    );
  };

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = useCallback(() => {
    dispatch(
      TopicActions.getKeyWordDetail({
        id,
        onSuccess: (rs: any) => {
          setTopicDetail(rs);
        },
      })
    );
  }, [topicDetail]);

  return (
    <div
      style={{
        width: currentWidth,
        height: currentHeight,
      }}
      className="keyword-modal-container"
    >
      <div className="keyword-modal-content">
        <div className="keyword-modal-title flex">
          <div className="flex-1">
            Nội dung liên quan đến{" "}
            <span className="keyword-modal-title-name">
              {topicDetail?.entitySnapshot}
            </span>
          </div>
          <div onClick={() => onHide()}>
            <CloseIcon />
          </div>
        </div>
        <DetailedStatistics
          currentHeight={currentHeight}
          currentWidth={currentWidth}
          topicDetail={topicDetail}
          imageURL={imageURL}
          onFollow={onFollow}
          valueFollow="từ khóa"
        />
      </div>
    </div>
  );
}
