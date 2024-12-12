import {
  PencilIcon,
  RectangleGroupIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import { Button, Tooltip, getKeyValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SVGDecrease, SVGIncrease } from "../../asset/svgs";
import { HeadCellBase } from "../../components/Table/CustomTable";
import CustomTableKeyWordFirst from "../../components/Table/CustomTableKeyWordFirst";
import DetailedStatisticsComponent from "./detailedStatisticsComponent";
import DetailedStatisticsKeyWordComponent from "./detailedStatisticsComponent/DetailedStatisticsKeyWord";

interface Props {
  dataList?: any;
  setIsEntityIdKeyWord?: any;
  setIsEntityIdTopic?: any;
  setIsShowKeyWord?: any;
  setIsShowTopic?: any;
  flag?: boolean;
}

export default function TableKeyFollow(props: Props) {
  const {
    dataList,
    setIsEntityIdKeyWord,
    setIsShowKeyWord,
    setIsShowTopic,
    setIsEntityIdTopic,
    flag = true,
  } = props;
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [isShow, setIsShow] = useState(false);
  const [isShowTopic, setShowTopic] = useState(false);

  const [entityID, setEntityID] = useState<string>("");
  const [topicCode, setTopicCode] = useState<string>("");

  const headCells: any[] = [
    HeadCellBase.numberOrder,
    {
      key: "entitySnapshot",
      name: "KEY WORD",
    },
    {
      key: "topic",
      name: "CHỦ ĐỀ",
    },
    {
      key: "volumePoint",
      name: "ĐIỂM TĂNG TRƯỞNG",
    },
    {
      key: "actions",
      name: "THAO TÁC",
    },
  ];
  useEffect(() => {
    setTotalPage(dataList?.pagination?.totalPage);
    setPage(dataList?.pagination?.page);
    let targetArray: any[] = convertArray(dataList?.keywords, page, pageSize);
    if (targetArray?.length > 0) {
      setRows(targetArray);
    }
  }, [dataList]);
  const handleShowModalTopic = (id: string) => {
    setTopicCode(id);
  };
  const handleShowModalKeyWord = (id: string) => {
    setEntityID(id);
  };
  return (
    <div className="bg-white lg:rounded-xl pt-6">
      {isShowTopic && (
        <DetailedStatisticsComponent
          id={topicCode}
          onHide={() => {
            setShowTopic(false);
          }}
        />
      )}
      {isShow && (
        <DetailedStatisticsKeyWordComponent
          id={entityID}
          onHide={() => {
            setIsShow(false);
          }}
        />
      )}
      <CustomTableKeyWordFirst
        headCells={headCells}
        rows={rows}
        page={page}
        pageSize={pageSize}
        totalPage={totalPage}
        total={5}
        renderCell={(row, columnKey) => {
          let value = getKeyValue(row, columnKey as any);
          switch (columnKey) {
            case "volumePoint":
              return (
                <div>
                  {value >= 0 && (
                    <div className="flex items-center w-full gap-1">
                      <SVGIncrease />
                      <p className="text-[#23C16B]">{value}</p>
                    </div>
                  )}
                  {value < 0 && (
                    <div className="flex items-center w-full gap-1">
                      <SVGDecrease />
                      <p className="text-[#FF5247]">{Math.abs(value)}</p>
                    </div>
                  )}
                </div>
              );
            case "actions":
              return (
                <div className="flex flex-row justify-center items-center gap-1">
                  <Tooltip content="Chi tiết chủ đề" placement="top">
                    <div
                      className={
                        flag
                          ? "cursor-pointer bg-[#F7F9FA] rounded-[20px] p-2 justify-center"
                          : "hidden"
                      }
                      onClick={() => {
                        setShowTopic(true);
                        handleShowModalTopic(row?.topicId);
                      }}
                    >
                      <SwatchIcon color="#FFAA47" width={20} />
                    </div>
                  </Tooltip>
                  <Tooltip content="Chi tiết từ khoá" placement="bottom">
                    <div
                      className=" cursor-pointer bg-[#F7F9FA] rounded-[20px] p-2"
                      onClick={() => {
                        setIsShow(true);
                        handleShowModalKeyWord(row?._id);
                      }}
                    >
                      <RectangleGroupIcon color="#4CD471" width={20} />
                    </div>
                  </Tooltip>
                </div>
              );
          }
          return null;
        }}
      />
    </div>
  );
}
function convertArray(
  originalArray: any[],
  page: number,
  pageSize: number
): any[] {
  const slicedArray = originalArray?.slice(0, 5);
  return slicedArray?.map((item, index) => {
    return {
      _id: item?.entityID || "",
      entitySnapshot: item?.entitySnapshot || "",
      topic: item?.topic?.topicName || "",
      topicId: item?.topic?.topicCode || "",
      volumePoint: item?.volumePoint || 0,
      action: "action",
      stt: index + 1,
    };
  });
}
