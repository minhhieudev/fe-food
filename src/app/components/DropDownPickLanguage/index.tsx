import { SVGENG, SVGVI } from "@/app/asset/svgs";
import { LANG } from "@/app/utils/language/language";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
export default function DropDownPickLanguage({
  textColor,
}: {
  textColor?: string;
}) {
  const [current, setCurrent] = useState<any>("vi");
  const [dropDown, setDropDown] = useState(false);

  const btnRef: any = useRef();

  const dataList = [
    {
      value: "vi",
      title: "VI",
      icon: <SVGVI />,
    },
    {
      value: "en",
      title: "EN",
      icon: <SVGENG />,
    },
  ];
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const handlePickLanguage = (value: string) => {
    if (value !== current) {
      localStorage.setItem(LANG.KEY, value);
      setDropDown(false);
      setCurrent(value);
      window.location.reload();
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!btnRef.current?.contains(e.target)) {
        setDropDown(false);
      }
    });

    setCurrent(localStorage.getItem(LANG.KEY) || "vi");
  }, []);

  return (
    <div className="flex justify-center items-center flex-col bg-[] z-40">
      <div>
        {dataList.map((item: any, index: number) => {
          if (current === item.value) {
            return (
              <div
                ref={btnRef}
                key={index}
                className={`flex justify-center items-center gap-2 text-[${
                  textColor ? textColor : "#FF8900"
                }] cursor-pointer text-[20px]`}
                onClick={handleDropDown}
              >
                {item?.icon}
                <p>{item?.title}</p>
                <ChevronDownIcon width={12} />
              </div>
            );
          }
        })}
      </div>
      <div className="flex justify-center">
        {dropDown && (
          <div className="flex p-[12px] absolute flex-col border-solid border-1 shadow-2xl z-100 rounded-md gap-[8px] bg-[#fff]">
            {dataList.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center cursor-pointer gap-[4px] text-[16px]"
                  onClick={() => handlePickLanguage(item?.value)}
                >
                  {item?.icon}
                  <p>{item?.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
