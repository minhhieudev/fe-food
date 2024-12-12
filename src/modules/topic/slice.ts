import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TopicProps = {
  allTopicByCustomer: any[];
  topicList: Array<any>;
  topicFollowed: any;
  topicListMore: any;
};

const initialState: TopicProps = {
  topicList: [],
  topicFollowed: [],
  topicListMore: [],
  allTopicByCustomer: [],
};

const TopicSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    getTopicList: (state: TopicProps, { payload }: PayloadAction<any>) => {},
    getTopicListMore: (
      state: TopicProps,
      { payload }: PayloadAction<any>
    ) => {},
    getTopicByCustomer: (
      state: TopicProps,
      { payload }: PayloadAction<any>
    ) => {},
    saveTopicByCustomer: (
      state: TopicProps,
      { payload }: PayloadAction<any>
    ) => {
      state.allTopicByCustomer = payload;
    },
    searchKeyWordByCustomer: (
      state: TopicProps,
      { payload }: PayloadAction<any>
    ) => {},
    getTopicFollowed: (
      state: TopicProps,
      { payload }: PayloadAction<any>
    ) => {},
    setTopicList: (state: TopicProps, { payload }: PayloadAction<any>) => {
      state.topicList = payload;
    },
    setTopicListMore: (state: TopicProps, { payload }: PayloadAction<any>) => {
      state.topicListMore = payload;
    },
    setTopicFollowed: (state: TopicProps, { payload }: PayloadAction<any>) => {
      state.topicFollowed = payload;
    },
    getTopicDetail: (state: TopicProps, { payload }: PayloadAction<any>) => {},
    followTopic: (state: TopicProps, { payload }: PayloadAction<any>) => {},
    followKeyWord: (state: TopicProps, { payload }: PayloadAction<any>) => {}, /*Người viết: Đinh văn thành; chức năng action cập nhật trạng thái của chủ đề ứng với từ khóa đã chọn*/
    getKeyWordDetail: (state: TopicProps, { payload }: PayloadAction<any>) => {},
  },
});

const TopicReducer = TopicSlice.reducer;
export default TopicReducer;

export const TopicActions = TopicSlice.actions;
export const TopicSelectors = {
  topicList: (state: RootState) => state.topic.topicList,
  topicListMore: (state: RootState) => state.topic.topicListMore,
  topicFollowed: (state: RootState) => state.topic.topicFollowed,
};
