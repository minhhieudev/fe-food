
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import MediaCardComponent from "../../MediaCardComponent";
import { Button } from "@nextui-org/react";

function RelatedMedia({
  currentHeight,
  topicDetail,
  imageURL,
  flag
}: {
  currentHeight: number;
  topicDetail: any;
  imageURL: string
  flag: number
}) {
    const [flagSizeData, setFlagSizeData] = useState<boolean>(true);
    const [currentTab, setCurrentTab] = useState<any>({
        key: 0,
        value:"youtube"
    });
    const [eventPlatform, setEventPlatform] = useState<any>({
        key: "",
        values: ""
    });
    const tabList = [
        { key: "Youtube", value: "youtube"},
        { key: "Dailymotion",value: "dailymotion" },
        { key: "Tiktok", value: "tiktok" },
    ];
    const handleSizeData = (event: string, eventClick : any)=>{
        setFlagSizeData(!flagSizeData);
        setEventPlatform({key:event , values: eventClick.target.innerText})
    }
    return (
        <div>
            <div className="ml-[24px] flex items-center">
                <div className="keyword-modal-video-title">Video liên quan<span style={{color:"#FFAA47", marginLeft:"10px"}}>{topicDetail?.entitySnapshot}</span></div>
            </div>
            <div className=" block md:hidden flex mt-[20px] ml-[20px]">
              {tabList.map((x, index) => {
                return (
                  <div key={`${index}`} className="mr-[10px]">
                    <Button
                      onClick={() => setCurrentTab({key:index, value:x.value})}
                      color={currentTab.key === index ? "primary" : "default"}
                    >
                      {x.key}
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="md:overflow-auto relate-video">
                { topicDetail?.statistic.map((e: any, index: number) => {
                    let dataCheckPlatform = tabList.find((t:any) => t.value === e.platform)
                    if(dataCheckPlatform){
                        return (
                        <div key={index}>
                            <div
                            style={{
                                
                            }}
                            className={``}
                            >
                              <div className="hidden md:block">
                                <div className="grid grid-cols-4 gap-4 p-[10px] responsive-video">
                                  {e.platform === "tiktok" ? 
                                  <ManyVideos
                                    data={e}
                                    eventPlatform ={eventPlatform}
                                    classList={""}
                                    width={"100%"}
                                    height={"760px"} 
                                    classListForIframe="rounded-[12px]"
                                  />: 
                                  <ManyVideos
                                    data={e}
                                    eventPlatform ={eventPlatform}
                                    classList={"p-[10px]"}
                                    width={""}
                                    height={""} 
                                    classListForIframe="rounded-[12px] responsive-video-iframe"
                                  />}
                                  
                                </div>
                              </div>
                              {e.platform === currentTab.value ? 
                                <div className="block md:hidden">
                                {e.platform === "tiktok" ? 
                                  <ManyVideos
                                    data={e}
                                    eventPlatform ={eventPlatform}
                                    classList={""}
                                    width={"100%"}
                                    height={"760px"} 
                                    classListForIframe="rounded-[12px]"
                                  />: 
                                  <ManyVideos
                                    data={e}
                                    eventPlatform ={eventPlatform}
                                    classList={"rounded-lg mt-[25px] p-2"}
                                    width={"100%"}
                                    height={"200"} 
                                    classListForIframe="rounded-[12px]"
                                    />
                                  }
                                </div>
                              :""}
                            </div>
                            {e.mediaList && e.mediaList.length > 0 ? 
                              <div className="hidden md:block">
                                <BtnSeeMoreAndHide
                                  imageURL={imageURL}
                                  e ={e}
                                  flagSizeData= {flagSizeData}
                                  eventPlatform = {eventPlatform}
                                  handleSizeData= {handleSizeData}
                                />
                              </div>
                            : ""}
                            {e.mediaList && e.mediaList.length > 0 && e.platform === currentTab.value ? 
                              <div className="block md:hidden">
                                <BtnSeeMoreAndHide
                                  imageURL={imageURL}
                                  e ={e}
                                  flagSizeData= {flagSizeData}
                                  eventPlatform = {eventPlatform}
                                  handleSizeData= {handleSizeData}
                                />
                              </div>
                            : ""}
                        </div>
                        );
                    }
                })} 
                
            </div>
        </div>
    );
}
export default RelatedMedia;

const ManyVideos = ({data, eventPlatform, classList, width ,height, classListForIframe }: {data: any, eventPlatform: any, classList: string,  width:string ,height:string, classListForIframe: string}) => {
    if(data.platform === eventPlatform.key){
        let arr = [];
        if(eventPlatform.values === 'Ẩn bớt') {
            arr = data.mediaList.slice(0,4)
        }else{
            arr = data.mediaList
        }
        return(
            <>
              {arr.map((e:any) =>{
                
                return (
                  <MediaCardComponent
                    id={e.mediaID}
                    width={width}
                    height={height}
                    platform={data.platform}
                    className={classList} 
                    classForIframe={classListForIframe}
                  />
                )
              })}
            </>
        )
    }else{
        return(
            <>
                {data.mediaList.slice(0,4).map((e:any) =>{
                  return (
                    <MediaCardComponent
                      id={e.mediaID}
                      width={width}
                      height={height}
                      platform={data.platform}
                      className={classList} 
                      classForIframe={classListForIframe}
                    />
                  )
              })}
            </>
        )
    }
};

const BtnSeeMoreAndHide = (
  {
    imageURL,
    e,
    flagSizeData,
    eventPlatform,
    handleSizeData
  }:{imageURL: string, e:any, flagSizeData:boolean, eventPlatform:any, handleSizeData: (e:any,y:any) => void | undefined}
) => {
  return(
    <div className="text-media-see-more">
      <div 
        className="flex gap-[20px] border border-[#FFAA47] w-[219px] h-[50px] rounded-[100px] py-[12px] px-[20px] ml-[30px] md:items-center cursor-pointer justify-center"
        onClick={(event:any)=>{handleSizeData(e?.platform, event)}}
      >
      <img 
        width={24}
        src={`${imageURL}${e?.platform}.png`}
        alt={e?.platform} 
      />
      <p
        className="text-[#FFAA47] text-[14px] leading-[16px] font-bold mt-[3px]"
      >{flagSizeData  ? "Xem thêm" : e?.platform === eventPlatform.key ? "Ẩn bớt" : "Xem thêm"}</p>

      {flagSizeData ? <ChevronDownIcon width = {24} height={24} className="text-[#FFAA47]"/> 
      : e?.platform === eventPlatform.key ? <ChevronUpIcon width = {24} height={24} className="text-[#FFAA47]"/> :
      <ChevronDownIcon width = {24} height={24} className="text-[#FFAA47]"/>}
      </div> 

    </div>
  )
} 
