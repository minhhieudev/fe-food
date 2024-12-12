import { MSTFetchKWT } from "@/core/services/fetch";

export const KeywordRequest = {
  getKeywordFollowed({
    page,
    pageSize,
    search,
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
  }) {
    return MSTFetchKWT.get(
      `customer/followed?${search ? "search=" + search : ""}${
        page ? "&page=" + page : ""
      }${pageSize ? "&pageSize=" + pageSize : ""}
    }`
    );
  },
  getKeywordFollowedFirst() {
    return MSTFetchKWT.get(`customer/followed`);
  },
  getSuggestedKeywords() {
    return MSTFetchKWT.get(`customer/suggested`);
  },
  getKeywordHot({
    topicID,
    page,
    pageSize,
    search,
  }: {
    topicID?: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }) {
    return MSTFetchKWT.get(
      `customer/feature?${topicID ? "&topicID=" + topicID : ""}${
        page ? "&page=" + page : ""
      }${pageSize ? "&pageSize=" + pageSize : ""}${
        search ? "&search=" + search : ""
      }`
    );
  },
  getKeywordHotCheck({
    topicID,
    page,
    pageSize,
    search,
  }: {
    topicID?: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }) {
    return MSTFetchKWT.get(
      `customer/feature?${topicID ? "&topicID=" + topicID : ""}${
        page ? "&page=" + page : ""
      }${pageSize ? "&pageSize=" + pageSize : ""}${
        search ? "&search=" + search : ""
      }`
    );
  },
};
