import { Language } from "@/app/utils/language/language";
import { formatPriceVND } from "@/app/utils/units";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { CurrencyActions, CurrencySelector } from "@/modules/currency/slice";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  balance?: number;
}
export default function DropDownPickUnit(props: Props) {
  const dispatch = useAppDispatch();
  const lang = new Language(window);
  const { balance } = props;
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState<any>(undefined);
  const [dropDown, setDropDown] = useState(false);
  const [dataList, setDataList] = useState<any>([]);

  const btnRef: any = useRef();
  const inputRef: any = useRef();

  const currency = useAppSelector(CurrencySelector.currency);
  useEffect(() => {
    setCurrent(currency);
  }, [currency]);

  useEffect(() => {
    if (!dropDown || isEmpty(dataList)) {
      dispatch(
        CurrencyActions.getCurrencies({
          onSuccess: (rs: any) => {
            setDataList(rs);
            dispatch(CurrencyActions.getDetail());
          },
        })
      );
    }
  }, [dropDown]);
  /*
    Người viết: Đinh Văn Thành
    Ngày viết: 27-05-2024
    Chức Năng: Khi đã chọn vào loại tiền tệ xong, loading lại trình duyệt vẫn dữ nguyên lại tiền tệ đã chọn 
  */
  useEffect(()=>{
    const loginInfo = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    if(loginInfo && loginInfo.currencyEditedVersion){
      let item = loginInfo.currencyEditedVersion
      dispatch(CurrencyActions.setCurrency({ item }));
    }
  },[])
  /*=================== END ======================= */
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!inputRef.current?.contains(e.target)) {
        if (!btnRef.current?.contains(e.target)) {
          setDropDown(false);
        }
      }
    });
  }, []);
  const handlePickLanguage = (item: any) => {
    dispatch(CurrencyActions.setCurrency({ item }));
    setDropDown(false);
    setCurrent(item);
  };

  const renderCurrency = useMemo(() => {
    return dataList
      .filter(
        (x: any) => x.code.toLowerCase().search(search.toLowerCase()) > -1
      )
      .map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={
              current?.code == item?.code
                ? "flex items-center cursor-pointer gap-[4px] text-[16px] rounded-md border-solid border-1 border-black bg-[#F2F4F5] px-2 justify-between"
                : "flex items-center cursor-pointer gap-[4px] text-[16px] px-2 justify-between"
            }
            onClick={() => handlePickLanguage(item)}
          >
            <p className={current?.code == item?.code ? "text-[#FF8900]" : ""}>
              {item?.code}
            </p>
            {current?.code == item?.code ? <CheckIcon width={16} /> : <></>}
          </div>
        );
      });
  }, [dataList, search]);

  return (
    <div className="flex justify-center items-center flex-col z-40">
      <div
        className="flex text-[20px] text-[#FF8900] gap-1 cursor-pointer"
        onClick={handleDropDown}
        ref={btnRef}
      >
        <p>
          {formatPriceVND(
            Number((Number(balance) * Number(current?.exchangeRate)).toFixed(5))
          )}
        </p>
        <p className="text-[12px]">{current?.code}</p>
        <ChevronDownIcon width={12} />
      </div>
      <div className="flex justify-center">
        {dropDown && (
          <div className="z-10 flex p-[12px] absolute flex-col border-solid border-1 shadow-2xl rounded-md w-[164px] gap-[12px] bg-[#fff]">
            <p className="text-[16px] text-[#404446]">
              {lang.gen("currency.select")}
            </p>
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang.gen("currency.find")}
              className=" outline outline-1 outline-[#FF8900] rounded-sm text-[12px] px-[14px] py-[8px]"
            />
            <div className="flex flex-col gap-[12px] font-thin max-h-96 overflow-auto">
              {renderCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
