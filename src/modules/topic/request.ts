import { MSTFetchKWT } from "@/core/services/fetch";
import qs from "qs";

export const TopicRequest = {
  getTopicByCustomer: (body?: {
    page: number | string;
    pageSize: number | string;
  }) =>
    MSTFetchKWT.get(
      body
        ? `topic/customer?${qs.stringify(body, {
            encode: false,
          })}`
        : `topic/customer`
    ),
  searchKeyWordByCustomer: (query: { search: string; topicIDs: string[] }) =>
    MSTFetchKWT.get(
      `customer/search?${qs.stringify(
        {
          search: query.search,
          ...(query.topicIDs && {
            topicIDs: query.topicIDs.join(","),
          }),
        },
        {
          encode: false,
        }
      )}`
    ),

  getTopicDetail: (topicId: string) =>
    MSTFetchKWT.get(`topic/customer/${topicId}`),
  followTopic: (body: { topicID: string }) =>
    MSTFetchKWT.put(`topic/customer/follow`, body),

  /*
    Người viết: Đinh văn thành
    Ngày viết: 03-06-2024
    CHức năng: cập nhật trạng thái theo dõi chủ đề ứng với từ khóa đã chọn
    Method: PUT
    Param: id của chủ để muốn cập nhật trạng thái
  */
  followKeyWord: (body: { keywordID: string }) =>
    MSTFetchKWT.put(`customer/follow`, body),

  /*=================== End ============================*/
  getTopicFollowed: () => MSTFetchKWT.get(`topic/customer/followed`),
  getTopicList: () => MSTFetchKWT.get(`topic/customer`),
  getTopicListMore: ({
    page,
    pageSize,
    search,
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
  }) =>
    MSTFetchKWT.get(
      `topic/customer?page=${page}&pageSize=${pageSize}&search=${search}`
    ),
  getKeyWordDetail: (topicId: string) => MSTFetchKWT.get(`customer/${topicId}`),
};
