
import React  from "react";
interface Props {
    title?: string;
  }
export default function ShowTitle (props: Props ){
    return (<div className="text-2xl font-bold text-[#090A0A] h-10 mt-10 ml-6 capitalize" >{props.title}</div>)
}