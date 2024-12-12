import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SVGChevronDouble, SVGFilter, SVGIncrease } from "../../asset/svgs";
import OneTopicBtn from "./topicItem/OneTopicBtn";
import MSTPagination from "../../components/MSTPagination";
import { calculatePagination } from "../../utils/objectUtils";
import { Language } from "../../utils/language/language";
import SearchKeyWord from "../../components/MainScreen/SearchKeyWord";
interface Props {
  isOpen?: boolean;
  handleClose?: () => void;
  data?: any;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPage?: number;
  onChangePageSize?: (e: number) => void;
  onChangePage?: (e: number) => void;
  handleChangeSearch?: (e: any) => void;
  handleSearch?: () => void;
}
export default function KeyWordListMore(props: Props) {
  const {
    isOpen,
    handleClose,
    data,
    page = 0,
    pageSize = 0,
    total = 0,
    totalPage = 0,
    onChangePageSize = () => {},
    onChangePage = () => {},
    handleChangeSearch = () => {},
    handleSearch = () => {},
  } = props;
  const [hidden, setHidden] = useState(true);
  const lang = new Language(window);

  const _renderBottom = () => {
    const { startIndex, endIndex } = calculatePagination({
      page: page,
      total: total,
      pageSize: pageSize,
    });
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value) {
        onChangePageSize && onChangePageSize(+e.target.value);
      }
    };
    return (
      <div className="flex justify-between max-sm:flex-col">
        <div className="flex justify-center items-center max-sm:hidden">
          <span className="font-regular text-[#090A0A] text-base ">
            {`${startIndex}-${endIndex} `}
            <span className="w-[100px] text-[#72777A]">
              {lang.gen("table.of")}
            </span>
            {` ${total}`}
          </span>
          <Select
            className="w-[80px] ml-6"
            size="sm"
            onChange={onChange}
            labelPlacement="outside"
            variant="bordered"
            defaultSelectedKeys={[`${pageSize}`]}
            selectedKeys={[`${pageSize}`]}
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <SelectItem key={`${pageSize}`} value={pageSize}>
                {`${pageSize}`}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="max-sm:flex max-sm:justify-center max-sm:pt-3 max-sm:items-center">
          <MSTPagination
            total={totalPage}
            onChange={(page: number) => onChangePage && onChangePage(page)}
            page={page}
            initialPage={page}
          />
        </div>
      </div>
    );
  };
  return (
    <div>
      <Modal
        className="p-[24px] max-sm:p-0  max-sm:max-h-full max-sm:flex max-w-[1200px] min-sm:max-h-full max-sm:max-w-[500px] max-sm:bottom-[5%] max-sm:mx-[20px] max-sm:rounded-[20px]"
        onClose={handleClose}
        isOpen={isOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex w-full justify-between flex-col gap-4">
                <p>Các chủ đề hot</p>
              </ModalHeader>
              <ModalBody className="flex border-[24px] border-[#FFF7ED] rounded-[24px] justify-between max-sm:border-0 max-sm:px-2">
                <div className="w-full flex justify-end items-center gap-2 max-lg:gap-0">
                  <div className="w-[500px]">
                    <SearchKeyWord
                      title={lang.gen("bought.input-service-name")}
                      handleChangeSearch={handleChangeSearch}
                      handleSearch={handleSearch}
                    />
                  </div>
                  <div className="flex gap-1 border-1 border-gray-300 p-[6px] rounded-[4px] max-lg:p-[7px] items-center font-semibold text-[#72777A] cursor-pointer">
                    <SVGFilter />
                    <p className="max-lg:hidden">Bộ lọc</p>
                  </div>
                </div>
                <div className="flex-col w-full grid grid-cols-4 gap-3 max-sm:grid-cols-2 items-center h-full max-sm:max-h-[500px] justify-start max-sm:overflow-y-scroll">
                  {data?.keywordTopics?.map((item: any, index: number) => {
                    return (
                      <OneTopicBtn
                        key={`${index}`}
                        setHidden={setHidden}
                        index={index}
                        item={item}
                        hidden={hidden}
                      />
                    );
                  })}
                </div>
                {data?.keywordTopics?.length > 0 && _renderBottom()}
              </ModalBody>
              <ModalFooter className="flex">
                <Button
                  onPress={onClose}
                  className="border-1 border-gray-300 rounded-md text-[#72777A] bg-[#fff] font-bold"
                >
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
