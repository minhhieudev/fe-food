import React from "react";
import OneSubItem from "../component/OneSubItem";

interface Platform {
    name: string,
    icon: string,
    list : [
        {
            name: string,
            value: number,
            follow: boolean
        },
        {
            name: string,
            value: number,
            follow: boolean
        },
        {
            name: string,
            value: number,
            follow: boolean
        }
    ]
}

const SuggestionKeywords = ({imageURL}:{imageURL:string}) => {
    const data: Array<Platform>  = [
        {
          name: "Youtube",
          icon: "youtube",
          list: [
            {
              name: "Đen Hồng",
              value: 52,
              follow: true,
            },
            {
              name: "Cô gái Thái",
              value: 52,
              follow: false,
            },
            {
              name: "Trai Hàn Quốc",
              value: 52,
              follow: true,
            },
          ],
        },
        {
          name: "Dailymotion",
          icon: "dailymotion",
          list: [
            {
              name: "Đen Hồng",
              value: 52,
              follow: true,
            },
            {
              name: "Cô gái Thái",
              value: 52,
              follow: false,
            },
            {
              name: "Trai Hàn Quốc",
              value: 52,
              follow: true,
            },
          ],
        },
        {
          name: "Tiktok",
          icon: "tiktok",
          list: [
            {
              name: "Đen Hồng",
              value: 52,
              follow: true,
            },
            {
              name: "Cô gái Thái",
              value: 52,
              follow: false,
            },
            {
              name: "Trai Hàn Quốc",
              value: 52,
              follow: true,
            },
          ],
        },
    ]
    return (
        <>
            {
                data.map((oneItem, index) => {
                    return (
                    <div
                        className="keyword-modal-one-platform-container"
                        key={`${index}`}
                    >
                        <div className="keyword-modal-one-platform-title">
                            <div>
                                <img 
                                    width={36}
                                    src={`${imageURL}${oneItem?.icon}.png`}
                                    alt={oneItem?.name} 
                                />
                            </div>
                            <div className="keyword-modal-one-platform-title-name">
                                {oneItem.name}
                            </div>
                        </div>
                        {oneItem.list.map((subItem, index) => {
                        return <OneSubItem item={subItem} key={`${index}`} />;
                        })}
                    </div>
                    );
                })
            }
        </>
    );
};
export default SuggestionKeywords;
