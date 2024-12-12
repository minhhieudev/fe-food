import { useEffect, useMemo, useState } from "react";
import { SVGDecrease, SVGIncrease } from "../../../asset/svgs";
import DetailedStatisticsComponent from "../../components/detailedStatisticsComponent";
const OneTopicBtn = ({ setHidden, index, item, hidden }: any) => {
  const [isShow, setIsShow] = useState(false);

  const [title, setTitle] = useState(
    <div>
      <span>item?.entitySnapshot</span>
    </div>
  );
  const [onHover, setOnHover] = useState(false);

  useEffect(() => {
    if (onHover) {
      setTitle(
        (() => {
          const temp: any = [];
          for (let index = 0; index < 200; index++) {
            temp.push(
              <span
                style={{
                  marginRight: 50,
                }}
              >
                {item?.entitySnapshot}
              </span>
            );
          }
          return <div>{temp}</div>;
        })()
      );
    } else {
      setTitle(item?.entitySnapshot);
    }
  }, [hidden, item]);

  const renderModal = useMemo(() => {
    return isShow ? (
      <DetailedStatisticsComponent
        id={item?.entityID}
        onHide={() => {
          setIsShow(false);
        }}
      />
    ) : (
      <></>
    );
  }, [isShow]);

  const renderBtn = useMemo(() => {
    return (
      <div
        onClick={() => {
          setIsShow(true);
        }}
        onMouseEnter={() => {
          setHidden(false);
          setOnHover(true);
        }}
        onMouseLeave={() => {
          setHidden(true);
          setOnHover(false);
        }}
        key={index}
        style={{
          fontFamily: "Soup of Justice, sans-serif",
        }}
        className={
          "text-[12px] h-[70px]  max-md:h-[46px] p-1 border-5 border-[#fff] text-[#fff] rounded-[100px] max-w-[250px] bg-[#FFBD70] px-2 hover:bg-[#fff] py-3 max-lg:py-2 hover:border-[#FFBD70] hover:text-[#813232] flex items-center cursor-pointer justify-center"
        }
      >
        <div
          onMouseEnter={() => {
            setHidden(false);
            setOnHover(true);
          }}
          onMouseLeave={() => {
            setHidden(true);
            setOnHover(false);
          }}
          className="keyword-text-hover-container w-full justify-center items-center flex"
        >
          <p className="keyword-text-hover">{title}</p>
        </div>
        <div
          className={
            hidden === false && onHover
              ? "flex rounded-[100px] max-md:h-[30px] h-[30px] max-md:w-[90px] items-center gap-1 text-[#813232] border-3 border-[#FFBD70] w-[100px] justify-center"
              : "flex bg-[#fff] max-md:h-[30px] max-md:w-[90px] py-[6px] rounded-[100px] items-center gap-1 text-[#813232] w-[100px] justify-center "
          }
        >
          {item?.volumePoint < 0 && (
            <>
              <SVGDecrease />
              {Math.abs(item?.volumePoint).toLocaleString("de-DE")}
            </>
          )}
          {item?.volumePoint === 0 && (
            <>
              <SVGIncrease />
              {Math.abs(item?.volumePoint).toLocaleString("de-DE")}
            </>
          )}
          {item?.volumePoint > 0 && (
            <>
              <SVGIncrease />
              {Math.abs(item?.volumePoint).toLocaleString("de-DE")}
            </>
          )}
        </div>
      </div>
    );
  }, [title, hidden]);

  return (
    <div className="">
      {renderModal}
      {renderBtn}
      {/* <div className="flex w-full bg-[red]">{renderBtn}</div> */}
    </div>
  );
};

export default OneTopicBtn;
