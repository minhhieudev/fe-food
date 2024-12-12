import { useAppDispatch } from "@/core/services/hook";
import { KeywordActions, KeywordSelectors } from "@/modules/keyword/slice";
import { TopicActions, TopicSelectors } from "@/modules/topic/slice";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  SVGDecreaseSmall,
  SVGIncreaseSmall,
  SVGKey,
  SVGStar,
  SVGTag,
} from "../../asset/svgs";
import TableKeyFollow from "../components/TableKeyFollow";
import ModalKeyHot from "../components/modals/ModalKeyHot";
import DetailIcon from "../icons/DetailIcon";
import ShowMoreIcon from "../icons/ShowMoreIcon";
import UpIcon from "../icons/UpIcon";
import "./style.css";
import DetailedStatisticsKeyWordComponent from "../components/detailedStatisticsComponent/DetailedStatisticsKeyWord";
import DetailedStatisticsComponent from "../components/detailedStatisticsComponent";
import bg from "../../asset/images/bgKeyFollow.png";

interface Keywords {
  entityID: string;
  entitySnapshot: string;
  volumePoint: number;
  topic: {
    topicCode: string;
    topicName: string;
  };
}

function MyTopicsSection() {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const TopticFollowed = useSelector(TopicSelectors.topicFollowed);
  const KeywordHot = useSelector(KeywordSelectors.keyHot);

  const [currentTopicIndex, setCurrentTopicIndex] = useState<any>(null);
  const [currentTopic, setCurrentTopic] = useState<any>(true);
  const [suggestedKeywords, setSuggestedKeywords] = useState<Array<Keywords>>();
  const [isEntityIdKeyWord, setIsEntityIdKeyWord] = useState<string>("");
  const [isShowKeyWord, setIsShowKeyWord] = useState(false);
  const [isEntityIdTopic, setIsEntityIdTopic] = useState<string>("");
  const [isShowTopic, setIsShowTopic] = useState(false);

  const [id, setId] = useState<string>();

  useEffect(() => {
    dispatch(TopicActions.getTopicFollowed({}));
    dispatch(KeywordActions.getKeyHot({}));
    dispatch(KeywordActions.getKeyHotCheck({}));
  }, []);

  useEffect(() => {
    dispatch(
      KeywordActions.getSuggestedKeywords({
        onSuccess: (rs: any) => {
          setSuggestedKeywords(rs.data.keywords);
        },
      })
    );
  }, []);
  const handleClose = () => {
    setIsShowModal(false);
  };
  const findId = (entityID: string) => {
    setId(entityID);
    dispatch(
      KeywordActions.getKeyHot({
        topicID: entityID,
      })
    );
  };
  const renderModalKeyword = useMemo(() => {
    return isShowKeyWord ? (
      <DetailedStatisticsKeyWordComponent
        id={isEntityIdKeyWord}
        onHide={() => {
          setIsShowKeyWord(false);
        }}
      />
    ) : (
      <></>
    );
  }, [isShowKeyWord]);
  const renderModalTopic = useMemo(() => {
    return isShowTopic ? (
      <DetailedStatisticsComponent
        id={isEntityIdTopic}
        onHide={() => {
          setIsShowTopic(false);
        }}
      />
    ) : (
      <></>
    );
  }, [isShowTopic]);
  return (
    <div className="bg-custom-rgba2 flex w-full h-full p-[48px] rounded-[12px] ">
      {renderModalKeyword}
      {renderModalTopic}
      <ModalKeyHot isOpen={isShowModal} handleClose={handleClose} id={id} />
      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-1 keyword-my-topic-left">
          <div className="keyword-my-topic-left-title-container">
            <div className="keyword-hot-topic-fl">Chủ đề đang theo dõi</div>
            <SVGStar />
          </div>
          <div className="keyword-hot-topic-fl-content">
            {TopticFollowed?.keywordTopics?.length > 0 ? (
              TopticFollowed?.keywordTopics?.map((item: any, index: number) => {
                return (
                  <div
                    key={`${index}`}
                    className="keyword-hot-one-topic-container"
                  >
                    <div className="keyword-hot-one-topic-content">
                      <div className="keyword-hot-one-topic-name-container">
                        <div className="keyword-hot-one-topic-name-lb">
                          {item.entitySnapshot}
                        </div>
                        <div
                          className="cursor-pointer bg-[#F7F9FA] border w-[32px] h-[32px] p-[8px] rounded-full "
                          onClick={(e: any) => {
                            setIsEntityIdTopic(item.entityID);
                            setIsShowTopic(!isShowTopic);
                          }}
                        >
                          <SVGTag />
                        </div>
                      </div>
                      <div className="keyword-hot-one-topic-value-container">
                        {item?.volumePoint >= 0 && (
                          <div className="flex text-[#23C16B] text-[18px] w-full gap-2">
                            <SVGIncreaseSmall />
                            <p>{Math.abs(item?.volumePoint)}</p>
                          </div>
                        )}
                        {item?.volumePoint < 0 && (
                          <div className="flex text-[#FF5247] text-[18px]  w-full gap-2">
                            <SVGDecreaseSmall />
                            <p>{Math.abs(item?.volumePoint)}</p>
                          </div>
                        )}
                        <div className="keyword-hot-one-topic-subvalue-container">
                          <div>
                            <SVGKey />
                          </div>
                          <div className="keyword-hot-one-topic-subvalue-value-container">
                            <div className="keyword-hot-one-topic-subvalue-value-vl">
                              {item?.totalKeywords}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="keyword-hot-topic-fl text-[14px]">
                Bạn chưa theo dõi chủ đề nào
              </div>
            )}
          </div>
        </div>
        <div className="col-span-4 md:col-span-3">
          <div className="hidden md:block pb-4">
            <div
              style={{
                backgroundColor: "#00000020",
              }}
              className="rounded-lg py-[10px] px-[200px] text-center text-white text-[24px]"
            >
              CÁC TỪ KHÓA NỔI BẬT
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${bg.src})`,
              backgroundSize: "cover",
              padding: 24,
              borderRadius: 12,
            }}
          >
            <div className="bg-white p-[24px] rounded-lg text-white mt-2">
              <div className="flex gap-2 xl:overflow-hidden md:overflow-auto sm:overflow-auto  text-topic-label p-[12px]">
                <Button
                  className={
                    currentTopic
                      ? "bg-[#FF8900] text-white rounded-[4px]"
                      : "rounded-[4px]"
                  }
                  onPress={() => {
                    setCurrentTopicIndex(null);
                    setCurrentTopic(true);
                    dispatch(KeywordActions.getKeyHot({}));
                  }}
                >
                  Top nổi bật
                </Button>
                {TopticFollowed?.keywordTopics?.map(
                  (item: any, index: number) => {
                    return (
                      <Button
                        className={
                          currentTopicIndex == index
                            ? "bg-[#FF8900] text-white rounded-[4px]"
                            : " rounded-[4px]"
                        }
                        key={index}
                        onPress={() => {
                          findId(item?.entityID);
                          setCurrentTopicIndex(index);
                          setCurrentTopic(false);
                        }}
                      >
                        {item?.entitySnapshot}
                      </Button>
                    );
                  }
                )}
              </div>
              <TableKeyFollow
                dataList={KeywordHot}
                setIsEntityIdKeyWord={setIsEntityIdKeyWord}
                setIsShowKeyWord={setIsShowKeyWord}
                setIsShowTopic={setIsShowTopic}
                setIsEntityIdTopic={setIsEntityIdTopic}
                flag={false}
              />
              {KeywordHot && KeywordHot.keywords.length > 0 ? (
                <div className=" text-topic">
                  <div
                    className="text-[#fff] bg-[#FF8900] rounded-[8px] px-4 py-[4px] flex justify-center items-center gap-2 cursor-pointer w-[250px] h-[28px]"
                    onClick={() => {
                      setIsShowModal(true);
                    }}
                  >
                    <p>Xem thêm</p>
                    <ChevronDownIcon color="#fff" width={20} height={20} />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="keyword-key-suggestion">
                <div className="keyword-key-suggestion-title">
                  từ khóa gợi ý
                </div>
              </div>
              <div>
                {suggestedKeywords?.map((item: any, index: number) => {
                  return (
                    <div
                      key={`${index}`}
                      className="mt-[24px] px-[16px] py-[8px] keyword-hot-line"
                    >
                      <div className="flex items-center">
                        <div className="keyword-hot-name">
                          {item?.entitySnapshot}
                        </div>
                        <div className="keyword-hot-value">
                          <div className="keyword-hot-value-vl">
                            {item?.volumePoint}
                          </div>
                          <div>
                            <UpIcon />
                          </div>
                        </div>
                        <div className="keyword-hot-topic-container">
                          <div className="keyword-hot-topic-value">
                            {item?.topic.topicName}
                          </div>
                          <div>
                            <DetailIcon />
                          </div>
                        </div>
                        <div
                          className="keyword-hot-topic-icon cursor-pointer"
                          onClick={(e: any) => {
                            setIsEntityIdKeyWord(item.entityID);
                            setIsShowKeyWord(!isShowKeyWord);
                          }}
                        >
                          <ShowMoreIcon />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTopicsSection;
