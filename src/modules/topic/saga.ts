import { takeLatest, put, delay } from "redux-saga/effects";
import { TopicActions } from "./slice";
import { TopicRequest } from "./request";
import { PayloadAction } from "@reduxjs/toolkit";

function* TopicSaga() {
  yield takeLatest(TopicActions.getTopicList, getTopicList);
  yield takeLatest(TopicActions.getTopicByCustomer, getTopicByCustomer);
  yield takeLatest(
    TopicActions.searchKeyWordByCustomer,
    searchKeyWordByCustomer
  );
  yield takeLatest(TopicActions.getTopicDetail, getTopicDetail);
  yield takeLatest(TopicActions.getTopicList, getTopicList);
  yield takeLatest(TopicActions.getTopicListMore, getTopicListMore);
  yield takeLatest(TopicActions.getTopicFollowed, getTopicFollowed);
  yield takeLatest(TopicActions.followTopic, followTopic);
  yield takeLatest(TopicActions.getKeyWordDetail, getKeyWordDetail);
  yield takeLatest(TopicActions.followKeyWord, followKeyWord);
}

function* followTopic({ payload }: PayloadAction<any>) {
  try {
    const { id, onSuccess } = payload;
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.followTopic({ topicID: id });
    if (rs.success) {
      onSuccess && onSuccess(rs);
    }
  } catch (error) {}
}
/*
    Người viết: Đinh văn thành
    Ngày viết: 03-06-2024
    CHức năng: cập nhật trạng thái theo dõi chủ đề ứng với từ khóa đã chọn
  */
function* followKeyWord({ payload }: PayloadAction<any>) {
  try {
    const { id, onSuccess } = payload;
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.followKeyWord({ keywordID: id });
    if (rs.success) {
      onSuccess && onSuccess(rs);
    }
  } catch (error) {}
}
/*=================== End ============================*/
function* getTopicDetail({ payload }: PayloadAction<any>) {
  try {
    const { id, onSuccess } = payload;
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.getTopicDetail(id);
    if (rs.success) {
      onSuccess && onSuccess(rs?.data?.keywordTopic);
    }
  } catch (error) {}
}

function* searchKeyWordByCustomer({ payload }: PayloadAction<any>) {
  try {
    const { query, onSuccess } = payload;
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.searchKeyWordByCustomer(query);
    if (rs.success) {
      onSuccess && onSuccess(rs?.data?.keywords);
    }
  } catch (error) {}
}

function* getTopicByCustomer({ payload }: PayloadAction<any>) {
  try {
    const { onSuccess } = payload;

    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.getTopicByCustomer();
    if (rs.success) {
      yield put(TopicActions.saveTopicByCustomer(rs.data?.keywordTopics));
      onSuccess && onSuccess(rs?.data?.keywordTopic);
    }
  } catch (error) {}
}

function* getTopicList({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;
  try {
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.getTopicList();
    if (rs.success) {
      yield put(TopicActions.setTopicList(rs.data?.keywordTopics));
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) {}
}
function* getTopicListMore({ payload }: PayloadAction<any>) {
  const {
    page = 1,
    pageSize = 20,
    search = "",
    onSuccess = (rs: any) => {},
    onFail = (rs: any) => {},
  } = payload;

  try {
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.getTopicListMore({
      page,
      pageSize,
      search,
    });
    if (rs.success) {
      yield put(TopicActions.setTopicListMore(rs.data));
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) {}
}
function* getTopicFollowed({ payload }: PayloadAction<any>) {
  const { onSuccess = (rs: any) => {}, onFail = (rs: any) => {} } = payload;

  try {
    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.getTopicFollowed();
    if (rs.success) {
      yield put(TopicActions.setTopicFollowed(rs.data));
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) {}
}
function* getKeyWordDetail({ payload }: PayloadAction<any>) {
  try {
    const { id, onSuccess, onFail } = payload;

    const rs: {
      success: boolean;
      data: any;
    } = yield TopicRequest.getKeyWordDetail(id);
    if (rs.success) {
      onSuccess && onSuccess(rs?.data?.keyword);
    } else {
      onFail && onFail(rs);
    }
  } catch (error) {}
}
export default TopicSaga;
