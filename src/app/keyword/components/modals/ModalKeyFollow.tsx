import { useAppDispatch } from "@/core/services/hook";
import { KeywordActions, KeywordSelectors } from "@/modules/keyword/slice";
import { RectangleGroupIcon, SwatchIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SVGDecrease, SVGIncrease } from "../../../asset/svgs";
import SearchKeyWord from "../../../components/MainScreen/SearchKeyWord";
import { HeadCellBase } from "../../../components/Table/CustomTable";
import CustomTableKeyWord from "../../../components/Table/CustomTableKeyWord";
import DetailedStatisticsComponent from "../detailedStatisticsComponent";
import DetailedStatisticsKeyWordComponent from "../detailedStatisticsComponent/DetailedStatisticsKeyWord";
import { debounce } from "lodash";
interface Props {
  isOpen?: boolean;
  handleClose?: () => void;
  data?: any;
}
export default function ModalKeyFollow(props: Props) {
  const { isOpen, handleClose, data } = props;
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>("");
  const [dataKeyWord, setDataKeyWord] = useState<any>();

  const [isShow, setIsShow] = useState(false);
  const [isShowTopic, setIsShowTopic] = useState(false);

  // const dataKeyWord = useSelector(KeywordSelectors.keyFollowed);

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
        KeywordActions.getKeyFollowed({
          page: page,
          pageSize: pageSize,
          search: search,
          onSuccess(rs: any) {
            setDataKeyWord(rs?.data);
          },
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
    setTotalPage(dataKeyWord?.pagination?.totalPage);
    setPage(dataKeyWord?.pagination?.page);
    let targetArray: any[] = convertArray(
      dataKeyWord?.keywords,
      page,
      pageSize
    );
    setRows(targetArray);
  }, [dataKeyWord]);
  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };
  const [entityID, setEntityID] = useState<string>("");
  const [topicCode, setTopicCode] = useState<string>("");
  const handleShowModalTopic = (id: string) => {
    setTopicCode(id);
  };
  const handleShowModalKeyWord = (id: string) => {
    setEntityID(id);
  };

  return (
    <Modal
      className="p-[24px] max-sm:p-0 max-h-full max-w-[1200px] min-sm:max-h-full max-sm:max-w-[500px] max-sm:bottom-[5%] max-sm:mx-[20px] max-sm:rounded-[20px]"
      onClose={handleClose}
      isOpen={isOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex w-full justify-between flex-col gap-4">
              <p className=" font-bold text-[18px] text-[#090A0A]">
                Từ khoá đang theo dõi
              </p>
              <div className="max-w-[800px]">
                <SearchKeyWord
                  title="Tìm kiếm từ khoá"
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
                total={dataKeyWord?.pagination?.total}
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
                              <RectangleGroupIcon color="#4CD471" width={20} />
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
