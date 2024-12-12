import TextInput from "@/app/components/InputText";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { TopicActions } from "@/modules/topic/slice";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/solid";
import _ from "lodash";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SearchResult from "./SearchResult";
import DetailedStatisticsKeyWordComponent from "../components/detailedStatisticsComponent/DetailedStatisticsKeyWord";

interface Props {
  classScale?: string;
  onClickSearchItem?: (item: any) => void;
}
export default function SearchTopTopic(props: Props) {
  const { classScale, onClickSearchItem } = props;
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [showPopupSearch, setShowPopupSearch] = useState(false);
  const [checkWidth, setCheckWidth] = useState(window.innerWidth);
  const isMobileScreen = checkWidth < 1024;
  const iconSize = isMobileScreen ? 18 : 24;
  const fontSize = isMobileScreen ? 12 : 16;
  const [showPopupSelectTopic, setShowPopupSelectTopic] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const allTopicByCustomer = useAppSelector(
    (state) => state.topic.allTopicByCustomer
  );
  const dataPopupTopic = allTopicByCustomer.map((topic) => ({
    ...topic,
    key: topic.entityID,
    value: topic.entitySnapshot,
  }));
  const [isShowPopupKeyWordRelated, setIsShowPopupKeyWordRelated] =
    useState(false);
  const [keywordSelected, setKeywordSelected] = useState<any>(null);

  const handleClickItem = (item: any) => {
    let newArray = [...selectedItems];
    const findIndex = selectedItems.findIndex((i: any) => i.key === item.key);
    if (findIndex > -1) {
      newArray = newArray.filter((_, index) => index !== findIndex);
    } else {
      newArray.push(item);
    }
    setSelectedItems(newArray);
  };

  const performSearch = (search: string) => {
    dispatch(
      TopicActions.searchKeyWordByCustomer({
        query: {
          search: search,
          ...(selectedItems.length && {
            topicIDs: selectedItems.map((item) => item.key),
          }),
        },
        onSuccess: (keywordsData: any[]) => {
          setShowPopupSearch(true);
          setSearchResult(keywordsData);
        },
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce((query) => performSearch(query), 300),
    [selectedItems]
  );

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (search) {
        debouncedSearch(search);
      }
    }
  };

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    } else {
      setShowPopupSearch(false);
      setSearchResult([]);
    }
  }, [search, debouncedSearch]);

  useEffect(() => {
    const handleWindowResize = () => setCheckWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [checkWidth]);

  const handleClickItemSearch = (item: any) => {
    setKeywordSelected(item);
    setIsShowPopupKeyWordRelated(true);
  };

  /*
    Người sửa: Đinh văn thành
    Ngày sửa: 03-06-2024
    Lý do: hiện tại không còn dùng component KeywordRelated này để tìm kiếm chi tiết từ khóa nữa và thay vào đó dùng component DetailedStatisticsKeyWordComponent 
    Chức năng vẫn được giữ nguyên như cũ 

    Code cũ logic như sau 
    ========================================
    const renderModal = useMemo(() => {
    return isShowPopupKeyWordRelated ? (
      <KeywordRelated
        id={keywordSelected?._id}
        onHide={() => {
          setIsShowPopupKeyWordRelated(false);
          setKeywordSelected(null);
        }}
      />
    ) : (
      <></>
    );
  }, [isShowPopupKeyWordRelated, keywordSelected]);
  ====================================================
  */ 
  const renderModal = useMemo(() => {
    return isShowPopupKeyWordRelated ? (
      <DetailedStatisticsKeyWordComponent
        id={keywordSelected?._id}
        onHide={() => {
          setIsShowPopupKeyWordRelated(false);
          setKeywordSelected(null);
        }}
      />
    ) : (
      <></>
    );
  }, [isShowPopupKeyWordRelated, keywordSelected]);

  return (
    <div className={classScale}>
      <div
        className={`flex justify-between items-center gap-2 p-3 border-r-1 w-[65%]`}
      >
        <MagnifyingGlassIcon
          width={iconSize}
          height={iconSize}
          color="#979C9E"
        />
        <TextInput
          placeholder="Nhập từ khoá"
          removeBorder={true}
          classNames={{
            innerWrapper: ["px-0"],
            input: [`text-[${fontSize}px] font-[400]`],
          }}
          search={search}
          onChangeText={setSearch}
          onKeyPress={handleKeyPress}
        />
        <span className="cursor-pointer" onClick={() => setSearch("")}>
          <XMarkIcon width={iconSize} height={iconSize} color="#979C9E" />
        </span>
      </div>
      <div className="flex flex-1 justify-end items-center p-2 gap-3 overflow-hidden text-ellipsis">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowPopupSelectTopic(!showPopupSelectTopic)}
        >
          <p
            className={`font-[400] text-[${fontSize}px] text-[#090A0A] mr-[12px]`}
          >
            {selectedItems.length
              ? selectedItems.map((i) => i.value).join(", ")
              : "Chủ đề"}
          </p>

          <ChevronDownIcon height={iconSize} width={iconSize} color="#979C9E" />
        </div>

        {selectedItems.length ? (
          <span className="cursor-pointer" onClick={() => setSelectedItems([])}>
            <XCircleIcon height={iconSize} width={iconSize} color="#FFBD70" />
          </span>
        ) : null}
      </div>
      {showPopupSelectTopic && (
        <PopupSelectTopic
          toggle={showPopupSelectTopic}
          data={dataPopupTopic}
          selectedItems={selectedItems}
          onClickItem={(item: any) => handleClickItem(item)}
          onClosePopup={() => setShowPopupSelectTopic(false)}
        />
      )}
      {showPopupSearch && (
        <SearchResult
          toggle={true}
          data={searchResult}
          onClosePopup={() => setShowPopupSearch(false)}
          onClickItem={handleClickItemSearch}
        />
      )}
      {renderModal}
    </div>
  );
}

const PopupSelectTopic = ({
  toggle = false,
  data = [],
  selectedItems = [],
  onClickItem,
  onClosePopup,
}: {
  toggle: boolean;
  data: { key: string; value: string }[];
  selectedItems: any[];
  onClickItem?: any;
  onClosePopup?: any;
}) => {
  const selectedItemsKey = selectedItems.map((item) => item.key);
  const [show, setShow] = useState<boolean>(toggle);
  const refItems = useRef<any>(null);

  useEffect(() => {
    if (!show) {
      onClosePopup && onClosePopup();
    }
  }, [show, onClosePopup]);

  useEffect(() => {
    setShow(toggle);
  }, [toggle]);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (!refItems?.current.includes(e.target)) {
        setShow(false);
      }
    });
  }, []);

  const handleAddItem = (ref: any) => {
    if (!ref) return;
    if (!refItems.current) {
      refItems.current = [ref];
    } else {
      if (!refItems.current.includes(ref)) {
        refItems.current = [...refItems.current, ref];
      }
    }
  };

  if (!show) return null;
  return (
    <div
      className="absolute overflow-y-scroll right-0 bottom-[-205px] flex flex-col h-[200px] bg-white w-[328px] max-lg:w-full p-[12px] rounded-[12px] shadow-[0_2px_12px_0_rgba(0, 0, 0, 0.08)] border border-solid border-[#E3E5E5]"
      ref={(ref) => handleAddItem(ref)}
    >
      {data.map((item: any) => (
        <div
          key={item.key}
          className="flex flex-row w-full justify-between items-center px-[16px] py-[8px] hover:cursor-pointer"
          ref={(ref) => handleAddItem(ref)}
          onClick={() => onClickItem && onClickItem(item)}
        >
          <p className="overflow-hidden mr-[8px] font-[400] text-[16px] whitespace-nowrap text-ellipsis">
            {item.value}
          </p>
          {selectedItemsKey.includes(item.key) && (
            <CheckIcon height={16} width={16} color="#0F172A" />
          )}
        </div>
      ))}
    </div>
  );
};
