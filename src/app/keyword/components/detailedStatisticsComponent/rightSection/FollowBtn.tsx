import StarIcon from "@/app/keyword/icons/StarIcon";
import StartEmptyIcon from "@/app/keyword/icons/StartEmptyIcon";
import React from "react";

interface FollowBtnProp{
  followed:any
  onFollow: (e:any) => void | undefined;
  id: string
  value: string /* Người viết: Đinh văn thành, chức năng: để phân biệt đang hiện chi tiết của từ khỏa hay là chủ để*/
}

export default function FollowBtn(prop: FollowBtnProp) {
  const {followed , onFollow,id,value } = prop
  return (
    <button
      className= {followed ? "keyword-modal-btn-unfollow" : "keyword-modal-btn" } 
      onClick={(e: any)=>onFollow(id)}
    >
      <div>
        {followed ? <StarIcon /> :<StartEmptyIcon />}
      </div>
      <div style={{ color: "white" }} className="font-size-Follow">{followed ? `Bỏ theo dõi ${value} này` :`Theo dõi ${value} này`}</div>
    </button>
  );
}
