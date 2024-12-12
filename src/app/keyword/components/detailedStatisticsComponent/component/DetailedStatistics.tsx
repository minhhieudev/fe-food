import RelatedMedia from "../leftSection/RelatedMedia";
import FollowBtn from "../rightSection/FollowBtn";
import SuggestionKeywords from "../rightSection/SuggestionKeywords";
import PlatformStatisticsList from "../leftSection/PlatformStatisticsList";
interface DetailedStatisticsProp{
    currentWidth: number,
    currentHeight: number,
    topicDetail: any,
    imageURL: string
    onFollow: (e:any) => void | undefined,
    valueFollow: string
}

const DetailedStatistics = (prop: DetailedStatisticsProp) => {
    const {currentHeight,topicDetail, imageURL ,onFollow,valueFollow} = prop
    return (
        <>
            <div className=" p-[20px] md:overflow-auto">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3 hidden md:block">
                <div className="keyword-modal-report-container">
                  {topicDetail?.statistic.map((item: any, index: number) => {
                    return (
                      <PlatformStatisticsList
                        item={item}
                        index={index}
                        imageURL={imageURL}
                        flag = {1}
                        classList={"keyword-modal-one-report-container"}
                      />
                    );
                  })}
                </div>
                <div className="keyword-modal-report-no-container"></div>
                <RelatedMedia
                  currentHeight={currentHeight}
                  topicDetail={topicDetail}
                  imageURL={imageURL}
                  flag = {1}
                />
              </div>
              <div className="col-span-1 hidden md:block">
                
                <FollowBtn
                    followed={topicDetail?.followed}
                    onFollow={onFollow}
                    id = {topicDetail?._id}
                    value={valueFollow}
                />
                <div className="keyword-modal-platform-container">
                  <SuggestionKeywords imageURL={imageURL}/>
                </div>
              </div>
              <div className="col-span-4 block md:hidden overflow-auto" style={{height: currentHeight - 100}}>
                <div className="mb-4">
                  <FollowBtn
                      followed={topicDetail?.followed}
                      onFollow={onFollow}
                      id = {topicDetail?._id}
                      value={valueFollow}
                  />
                </div>
                <div className="keyword-modal-report-no-container-mb"></div>
                <div className="px-[12px] py-[24px]">
                  {topicDetail?.statistic.map((item: any, index: number) => {
                    return (
                      <PlatformStatisticsList
                        item={item}
                        index={index}
                        imageURL={imageURL}
                        flag = {1}
                        classList={"keyword-modal-one-report-container-mb w-full"}
                      />
                    );
                  })}
                </div>
                <div className="keyword-modal-report-no-container-mb"></div>
                <RelatedMedia
                  currentHeight={currentHeight}
                  topicDetail={topicDetail}
                  imageURL={imageURL}
                  flag = {1}
                />
                <div className="keyword-modal-report-no-container-mb"></div>
                <div className="keyword-modal-platform-container">
                  <SuggestionKeywords imageURL={imageURL}/>
                </div>
              </div>
            </div>
          </div>
        </>
    );
};
export default DetailedStatistics;