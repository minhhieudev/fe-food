type MediaCardComponentProps = {
  id: string;
  width?: string | number | undefined;
  height?: string | number | undefined;
  className?: string | undefined;
  platform: string;
  classForIframe?: string | undefined;
};

function MediaCardComponent({
  id,
  width,
  height,
  className = "col-span-1 ",
  platform,
  classForIframe,
}: MediaCardComponentProps) {
  const dataCheck: any = {
    youtube: "https://www.youtube.com/embed/",
    tiktok: "https://www.tiktok.com/embed/v2/",
    dailymotion: "https://www.dailymotion.com/embed/video/",
  };

  return (
    <div className={className}>
      <iframe
        width={width}
        height={height}
        src={`${dataCheck[platform]}${id}`}
        allowFullScreen
        className={classForIframe} // người viết : đinh văn thành; LÝ do: mong muốn bo tròn đường viền của video
      />
    </div>
  );
}

export default MediaCardComponent;
