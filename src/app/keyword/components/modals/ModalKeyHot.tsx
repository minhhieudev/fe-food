import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { useAppDispatch } from "@/core/services/hook";
import Search from "../../../components/MainScreen/Search";
import CustomTable, {
  HeadCellBase,
} from "../../../components/Table/CustomTable";
import { RectangleGroupIcon, SwatchIcon } from "@heroicons/react/24/outline";
import CustomTableKeyWord from "../../../components/Table/CustomTableKeyWord";
import { useSelector } from "react-redux";
import { KeywordActions, KeywordSelectors } from "@/modules/keyword/slice";
import { SVGDecrease, SVGIncrease } from "../../../asset/svgs";
import SearchKeyWord from "@/app/components/MainScreen/SearchKeyWord";
import DetailedStatisticsComponent from "../detailedStatisticsComponent";
import DetailedStatisticsKeyWordComponent from "../detailedStatisticsComponent/DetailedStatisticsKeyWord";
interface Props {
  isOpen?: boolean;
  handleClose?: () => void;
  data?: any;
  id?: any;
}
export default function ModalKeyHot(props: Props) {
  const { isOpen, handleClose, data, id } = props;
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>("");

  const [isShow, setIsShow] = useState(false);
  const [isShowTopic, setIsShowTopic] = useState(false);

  const [entityID, setEntityID] = useState<string>("");
  const [topicCode, setTopicCode] = useState<string>("");

  const dataKeyWord = useSelector(KeywordSelectors.keyFollowed);
  const KeywordHot = useSelector(KeywordSelectors.keyHot);

  const getKeyWordConfig = useCallback(
    ({
      page = 1,
      pageSize = 20,
      search,
    }: {
      page: number;
      pageSize: number;
      search: string;
    }) => {
      dispatch(
        KeywordActions.getKeyHot({
          topicID: id,
          page: page,
          pageSize: pageSize,
          search: search,
          onSuccess(rs: any) {},
        })
      );
    },
    [dispatch]
  );
  const handleChangePageSize = (newPageSize: number) => {
    if (newPageSize > (dataKeyWord?.totalPage || 0) / page) {
      setTotalPage(1);
      setPage(1);
      setPageSize(newPageSize);
      getKeyWordConfig({ page: 1, pageSize: newPageSize, search });
    } else {
      setPageSize(newPageSize);
      getKeyWordConfig({ page, pageSize: newPageSize, search });
    }
  };

  const handleChangePage = (newPage: number) => {
    if (page == newPage) return;
    setPage(newPage);
    getKeyWordConfig({ page: newPage, pageSize, search });
  };
  const onClickSearch = useCallback(() => {
    getKeyWordConfig({ page: 1, pageSize, search });
  }, [getKeyWordConfig, pageSize, search]);
  useEffect(() => {
    getKeyWordConfig({ page: page, pageSize: pageSize, search: search });
  }, []);
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
    setTotalPage(KeywordHot?.pagination?.totalPage);
    setPage(KeywordHot?.pagination?.page);
    let targetArray: any[] = convertArray(KeywordHot?.keywords, page, pageSize);
    setRows(targetArray);
  }, [KeywordHot]);
  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };

  const handleShowModalTopic = (id: string) => {
    setTopicCode(id);
  };
  const handleShowModalKeyWord = (id: string) => {
    setEntityID(id);
  };
  return (
    <div>
      <Modal
        size="5xl"
        className="p-[10px] max-sm:mx-[10px] max-sm:p-0 "
        onClose={handleClose}
        isOpen={isOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex w-full justify-between flex-col gap-4">
                <p className=" font-bold text-[18px]">Từ khoá nổi bật</p>
                <div className="max-w-[800px]">
                  <SearchKeyWord
                    title="Tìm kiếm từ khoá nổi bật"
                    handleChangeSearch={handleChangeSearch}
                    handleSearch={onClickSearch}
                  />
                </div>
              </ModalHeader>
              <ModalBody>
                {isShowTopic && (
                  <DetailedStatisticsComponent
                    id={topicCode}
                    onHide={() => {
                      setIsShowTopic(false);
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
                <CustomTableKeyWord
                  headCells={headCells}
                  rows={rows}
                  page={page}
                  pageSize={pageSize}
                  totalPage={totalPage}
                  onChangePage={handleChangePage}
                  onChangePageSize={handleChangePageSize}
                  total={KeywordHot?.pagination.total}
                  renderCell={(row, columnKey) => {
                    console.log({ row });

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
                                <p className="text-[#FF5247]">
                                  {Math.abs(value)}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      case "actions":
                        return (
                          <div className="flex flex-row justify-center items-center gap-1">
                            <Tooltip content="Chi tiết chủ đề" placement="top">
                              <div
                                onClick={() => {
                                  setIsShowTopic(true);
                                  handleShowModalTopic(row?.topicCode);
                                }}
                                className=" cursor-pointer bg-[#F7F9FA] rounded-[20px] p-2 justify-center"
                              >
                                <SwatchIcon color="#FFAA47" width={20} />
                              </div>
                            </Tooltip>

                            <Tooltip
                              content="Chi tiết từ khoá"
                              placement="bottom"
                            >
                              <div
                                onClick={() => {
                                  setIsShow(true);
                                  handleShowModalKeyWord(row?.entityID);
                                }}
                                className=" cursor-pointer bg-[#F7F9FA] rounded-[20px] p-2"
                              >
                                <RectangleGroupIcon
                                  color="#4CD471"
                                  width={20}
                                />
                              </div>
                            </Tooltip>
                          </div>
                        );
                    }
                    return null;
                  }}
                />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
function convertArray(
  originalArray: any[],
  page: number,
  pageSize: number
): any[] {
  return originalArray?.map((item, index) => {
    return {
      _id: item?._id || "",
      entitySnapshot: item?.entitySnapshot || "",
      topic: item?.topic?.topicName || "",
      volumePoint: item?.volumePoint || 0,
      action: "action",
      stt: index + 1,
      entityID: item?.entityID,
      topicCode: item?.topic.topicCode,
    };
  });
}
