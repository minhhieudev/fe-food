import ChannelItem from "./ChannelItem";
import "./style.css";
function ChannelHot() {
  const dataCreator = [
    {
      name: `Name-${Math.random().toFixed(2)}`,
      platform: "youtube",
    },
    {
      name: `Name-${Math.random().toFixed(2)}`,
      platform: "youtube",
    },
    {
      name: `Name-${Math.random().toFixed(2)}`,
      platform: "youtube",
    },
    {
      name: `Name-${Math.random().toFixed(2).toUpperCase()}`,
      platform: "youtube",
    },
    {
      name: `Name-${Math.random().toFixed(2)}`,
      platform: "youtube",
    },
    {
      name: `Name-${Math.random().toFixed(2)}`,
      platform: "youtube",
    },
  ];

  return (
    <div className="col-span-4 md:col-span-1">
      <div className="macs-channel-title">Nhà sáng tạo nổi bật</div>
      <div className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide pt-3">
        {dataCreator.map((item: any, index: number) => {
          return <ChannelItem item={item} index={index} />;
        })}
      </div>
    </div>
  );
}

export default ChannelHot;
