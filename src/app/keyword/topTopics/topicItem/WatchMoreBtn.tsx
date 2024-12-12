import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { TopicActions, TopicSelectors } from "@/modules/topic/slice";
import KeyWordListMore from "../KeyWordListMore";
import { SVGChevronDouble } from "@/app/asset/svgs";

const WatchMoreBtn = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const topicListMore = useAppSelector(TopicSelectors.topicListMore);

  const [page, setPage] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();
  const [search, setSearch] = useState<string>();
  const [total, setTotal] = useState();
  const [totalPage, setTotalPage] = useState();

  const getConfigTopicListMore = ({
    page = 1,
    pageSize = 20,
    search = "",
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
  }) => {
    dispatch(
      TopicActions.getTopicListMore({
        page: page,
        pageSize: pageSize,
        search: search,
        onSuccess: (rs: any) => {
          setPage(rs?.pagination?.page);
          setPageSize(rs?.pagination?.pageSize);
          setTotal(rs?.pagination?.total);
          setTotalPage(rs?.pagination?.totalPage);
        },
      })
    );
  };

  const handleClose = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    getConfigTopicListMore({ page: page, pageSize: pageSize, search: search });
  }, [page, pageSize, search]);

  const onChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
  };
  const onChangePage = (page: number) => {
    setPage(page);
  };
  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };
  const handleSearch = () => {
    getConfigTopicListMore({ search: search });
  };
  return (
    <div>
      <div>
        <KeyWordListMore
          isOpen={isShowModal}
          handleClose={handleClose}
          data={topicListMore || []}
          onChangePageSize={onChangePageSize}
          onChangePage={onChangePage}
          handleChangeSearch={handleChangeSearch}
          handleSearch={handleSearch}
          page={page}
          pageSize={pageSize}
          total={total}
          totalPage={totalPage}
        />
        <div
          onClick={() => {
            setIsShowModal(true);
          }}
          className={
            "p-1 border-5 bg-[#fff] rounded-[100px] max-w-[250px] border-[#FFBD70] px-2 flex items-center cursor-pointer justify-between py-4 max-md:h-[46px] max-lg:py-3"
          }
        >
          <div
            className="flex justify-between items-center w-full "
            onClick={() => {
              getConfigTopicListMore({});
            }}
          >
            <div className="keyword-btn-watch-more-text text-[#813232] w-full justify-center items-center flex ">
              xem thêm
            </div>
            <SVGChevronDouble />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMoreBtn;
