"use client";
import React, { useEffect, useState } from "react";
import MstCheckbox from "@/app/components/CheckBox/MSTCheckBox";
import { SVGATM, SVGPaypal, SVGTele } from "@/app/asset/svgs";
import FormPayment from "../FormPayment";
import History from "../History";
import FormPaymentBank from "../FormPaymentBank";
import Image from "next/image";
import Images from "@/app/asset";
import { Language } from "@/app/utils/language/language";
import { PhoneIcon } from "@heroicons/react/24/outline";
import SupportInformation from "@/app/support/SupportInformation";
import { useAppDispatch } from "@/core/services/hook";
import { SettingActions, SettingSelectors } from "@/modules/setting/slice";
import { useSelector } from "react-redux";
import FormPerfectMoney from "../FormPerfectMoney";
const CHECK_VALUE = {
  IS_USE_PAYPAL: "isUsePaypal",
  IS_USE_BANK: "isUseBank",
  IS_USE_PERFECT_MONEY: "isUsePerfectMoney",
};
export default function MethodHistory() {
  const lang = new Language(window);
  const [current, setCurrent] = useState<Number>(0);
  const [isUsePaypal, setIsUsePaypal] = useState<string>("");
  const [isUseBank, setIsUseBank] = useState<string>("");
  const [isUsePerfectMoney, setIsUsePerfectMoney] = useState<string>("");
  const dispatch = useAppDispatch();
  const [currentMethod, setCurrentMethod] = useState<Number>(0);
  const dataSupport = useSelector(SettingSelectors.setting);
  useEffect(() => {
    dispatch(SettingActions.getSetting({}));
  }, []);
  const switchList = [
    {
      id: 0,
      title: lang.gen("recharge.recharge"),
    },
    {
      id: 1,
      title: lang.gen("recharge.history"),
    },
  ];
  const dataMethod = [
    {
      id: 0,
      title: lang.gen("recharge.depositViabankcard"),
      icon: <Image src={Images.atm} alt="atm" width={48} />,
    },
    {
      id: 1,
      title: lang.gen("recharge.depositViaPaypal"),
      icon: <SVGPaypal />,
    },
    {
      id: 2,
      title: "Liên hệ trực tiếp",
      icon: <PhoneIcon color="#23C16B" width={50} />,
    },
    {
      id: 3,
      title: "Nạp qua Perfect Money",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.4998 0C24.0603 0 31 6.93946 31 15.5C31 24.0605 24.0603 31 15.4998 31C6.93946 31 -0.000244141 24.0605 -0.000244141 15.5C-0.000244141 6.93946 6.93946 0 15.4998 0Z"
            fill="#F01010"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.8398 10.4749H13.5267C13.3117 10.4504 13.0491 10.4504 12.7868 10.427C12.7155 10.4504 12.6908 10.523 12.6669 10.6183C12.6432 10.714 12.6669 10.7856 12.7155 10.8569L13.0018 10.8811C13.3591 10.9519 13.6217 11.0237 13.7897 11.096C13.9563 11.1911 14.0753 11.3584 14.1236 11.5733C14.1713 11.7883 14.195 12.0743 14.1713 12.4329C14.1468 12.9341 14.1236 13.5306 14.0997 14.2231C14.0753 14.9163 14.0279 15.6322 13.9798 16.3728C13.9326 17.5177 13.8298 20.307 13.5186 21.1328C13.4465 21.3238 13.3276 21.4435 13.1842 21.5161C13.0166 21.5866 12.8249 21.6584 12.5862 21.6831L12.2032 21.7308C12.1319 21.7779 12.1077 21.8505 12.1319 21.9699C12.1319 22.0417 12.1556 22.1128 12.2274 22.1849C12.5378 22.1612 12.8249 22.137 13.1358 22.1128H15.0253C15.3834 22.137 15.6946 22.1612 15.9814 22.1849C16.0534 22.137 16.1011 22.0654 16.1011 21.9699C16.1011 21.8737 16.0774 21.8023 16.005 21.7308L15.336 21.6831C15.1203 21.6584 14.953 21.6111 14.8338 21.5161C14.7738 21.4674 14.7257 21.4009 14.6899 21.3198C14.5488 20.9803 14.5457 20.406 14.553 20.0495C14.5684 19.3093 14.5775 18.5695 14.6009 17.8291C14.6249 17.089 14.6488 16.4436 14.6722 15.8948C14.6954 15.3936 14.7446 14.8677 14.7677 14.3425C14.7917 13.8179 14.8151 13.2919 14.8398 12.7668H14.8872C15.0785 13.1725 15.2697 13.5785 15.4368 14.0321C15.6281 14.4622 15.8188 14.8921 16.0093 15.2983L17.6092 18.7116C17.7534 18.9991 17.92 19.3572 18.1105 19.7869C18.3259 20.2405 18.5401 20.6699 18.7316 21.0995C18.8327 21.3271 18.9201 21.5403 18.9942 21.7408C19.0134 21.7408 19.1472 22.1808 19.162 22.232C19.254 22.3252 19.4047 22.323 19.4969 22.232C19.6454 21.8762 19.8003 21.5161 19.973 21.1718C20.4253 20.1568 20.897 19.1874 21.4298 18.2111L22.9818 15.131C23.1015 14.8677 23.2204 14.5811 23.3875 14.2712C23.5548 13.937 23.7217 13.6266 23.8653 13.364C23.9845 13.0772 24.0797 12.8865 24.1271 12.8147H24.1513L24.1997 20.1933C24.2229 20.5749 24.1997 20.8601 24.1757 21.0753C24.1566 21.2462 24.1085 21.4085 23.9444 21.4919C23.8482 21.6111 23.6571 21.6584 23.3464 21.6831L22.8203 21.7308C22.7724 21.7779 22.7487 21.8505 22.7724 21.9699C22.7724 22.0417 22.7966 22.1128 22.8686 22.1849C23.2267 22.1612 23.6088 22.137 23.9676 22.1128H26.0246C26.3827 22.137 26.7413 22.1612 27.1009 22.1849C27.1727 22.137 27.1962 22.0654 27.1962 21.9699C27.2199 21.8737 27.1962 21.8023 27.1485 21.7308L26.5745 21.6831C26.3114 21.6584 26.1201 21.5866 25.9999 21.4672C25.8818 21.348 25.7857 21.2044 25.7618 21.0131C25.7374 20.7984 25.7134 20.5345 25.7134 20.248C25.6645 19.3597 25.6313 18.4571 25.6081 17.5668C25.5839 16.6105 25.536 15.704 25.5126 14.8452V12.576C25.5126 12.1701 25.536 11.8598 25.5839 11.6207C25.6325 11.4063 25.7517 11.2155 25.9183 11.096C26.0859 11.0005 26.3719 10.9282 26.7539 10.8811L27.1125 10.8569C27.1606 10.809 27.1841 10.7375 27.1606 10.6183C27.1606 10.5462 27.1364 10.4749 27.0888 10.427C26.802 10.4504 26.5153 10.4504 26.2529 10.4749H24.9637C24.7483 10.4504 24.5091 10.4504 24.1997 10.427C24.1757 10.8322 24.0324 11.2868 23.8174 11.8122C23.5548 12.3603 23.2449 13.0301 22.8629 13.8179L21.1909 17.184C20.7574 18.1005 20.3626 18.9727 19.8313 19.8416H19.7837C19.3611 19.0442 18.9715 18.2169 18.5882 17.3995L16.5592 13.3398C16.2969 12.7668 16.0577 12.2182 15.8667 11.7167C15.6994 11.2155 15.6281 10.7856 15.6517 10.427C15.3655 10.4504 15.1024 10.4504 14.8398 10.4749ZM5.04248 19.5513C5.04248 20.1593 5.01854 20.6222 4.9699 20.9393C4.92177 21.5531 4.51656 21.7542 3.94529 21.7935L3.57939 21.8422C3.46171 21.9603 3.47078 22.2164 3.60484 22.3048C4.35932 22.2579 5.04147 22.2315 5.79846 22.2315C6.60561 22.2315 7.35806 22.267 8.16269 22.3048C8.21132 22.2562 8.23652 22.1831 8.26071 22.0858C8.26071 21.9641 8.23652 21.8903 8.18738 21.8422L7.69977 21.7935C7.30968 21.7683 7.04181 21.6952 6.89565 21.5733C6.88683 21.567 6.87801 21.5604 6.86944 21.5536C6.72203 21.4311 6.61644 21.2442 6.57209 20.9544C6.52371 20.6379 6.49926 20.1757 6.52371 19.5684V17.8631C5.98796 17.8878 5.50136 17.8631 5.06289 17.7903L5.04248 19.5513ZM3.48036 10.6588C3.45642 10.7559 3.5053 10.8287 3.57838 10.9023L4.2114 10.9743C4.47876 10.9995 4.67381 11.0721 4.79527 11.1941C4.91673 11.2911 4.99031 11.4619 5.01425 11.7293C5.03895 11.9969 5.06289 12.3873 5.06289 12.8976V16.5001C5.54974 16.5245 6.03635 16.5245 6.52371 16.5001V11.5345C6.49926 11.34 6.52371 11.1941 6.57209 11.0721C6.59628 10.9995 6.6938 10.9254 6.81527 10.9023C6.96142 10.8778 7.20536 10.8778 7.52161 10.8778C8.44618 10.9023 9.15227 11.1452 9.66332 11.6565C10.1502 12.167 10.3934 12.8734 10.3934 13.7503C10.4186 14.5287 10.2235 15.1859 9.80973 15.7209C9.44459 16.1843 8.9091 16.5245 8.17856 16.6949C7.47297 16.8655 6.47507 16.9386 5.13597 16.9136C3.96746 16.8907 2.70194 16.8171 1.31445 16.6712C2.84835 16.9875 3.99191 17.2062 4.72269 17.279C5.91463 17.4259 7.08314 17.4007 8.17856 17.2311C8.73824 17.1573 9.24954 17.0119 9.71221 16.8415C10.1502 16.647 10.5886 16.3791 11.0511 16.0621C11.3187 15.8678 11.5621 15.5503 11.7816 15.1373C11.9522 14.7477 12.0492 14.2853 12.0732 13.7251C12.0492 13.1163 11.9031 12.5821 11.6357 12.1189C11.3676 11.6565 11.0511 11.2911 10.637 11.0242C10.2235 10.7803 9.71221 10.585 9.12808 10.4633C8.56815 10.3663 7.91069 10.3174 7.15647 10.3174C6.42593 10.3174 5.76873 10.3174 5.18485 10.3416C4.60048 10.3663 4.06499 10.3905 3.60207 10.4391C3.52949 10.4882 3.48036 10.5611 3.48036 10.6588Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];
  useEffect(() => {
    let array : Array<object> = []
    dataSupport?.setting?.data?.settings.map((e: any, index: number) => {
      if (e.key === CHECK_VALUE.IS_USE_PAYPAL) {
        setIsUsePaypal(e.value);
      }else if (e.key === CHECK_VALUE.IS_USE_BANK ) {
        setIsUseBank(e.value);
      }else if (e.key === CHECK_VALUE.IS_USE_PERFECT_MONEY) {
        setIsUsePerfectMoney(e.value);
      }
      if((e.key === CHECK_VALUE.IS_USE_PAYPAL || e.key === CHECK_VALUE.IS_USE_PERFECT_MONEY ||
          e.key === CHECK_VALUE.IS_USE_BANK) && e.value === "true")
      {
        array.push({
          "key":e.key,
          "index": index
        })
      }
    });
    /*
      Người viết: Đinh văn Thành
      Ngày viết: 29-05-2024
      Chức năng: sắp xếp thức tự hiện thỉ trên màn hình UI
        VD: - màn hình UI hiện thị theo thứ tự:  nạp tièn qua ngân hàng, nạp tiền qua paypal,nạp tiên qua perfect money 
            - api trả về theo thứ tự sau: nạp tiên qua perfect money,nạp tièn qua ngân hàng, nạp tiền qua paypal
      ==> cần sắp xếp lại để hiển thị và vết hàm setTimeout để đợi cho lấy hết giá trị từ api xong mới sắp xếp, khi chạy xong clear hàm setTimeout
    */
    const timeOutId = setTimeout(
      () => {
            if( array && array.length > 0 && currentMethod !== 2){
              let arrayDataCheck : Array<object> = [] 
              array.map((event:any)=>{
                if(event.key === CHECK_VALUE.IS_USE_BANK){
                  arrayDataCheck.push({
                    "key":event.key,
                    "index": Number(event.index) - 4
                  })
                }else{
                  arrayDataCheck.push({
                    "key":event.key,
                    "index":event.index
                  })
                }
              })
              arrayDataCheck.sort(function(a:any, b: any){return a.index - b.index})
              arrayDataCheck.reverse()
              arrayDataCheck.map((e:any) =>{
                switch(e.key) {
                  case CHECK_VALUE.IS_USE_PERFECT_MONEY:
                    setCurrentMethod(2)
                    break;
                  case CHECK_VALUE.IS_USE_PAYPAL:
                    setCurrentMethod(1)
                    break;
                  case CHECK_VALUE.IS_USE_BANK:
                    setCurrentMethod(0)
                    break;
                  default:
                    break;
                  }
              })
            }else if (array && array.length <= 0){
              setCurrentMethod(2)
            }
        },
        500
    );
    return () => clearTimeout(timeOutId);
    /*====================== END ============================*/
  }, [dataSupport]);

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex gap-[24px] border-b-1 w-full">
        {switchList?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={
                current == index
                  ? "cursor-pointer border-b-1 border-[#FF8900] text-[#FF8900]"
                  : "cursor-pointer "
              }
              onClick={() => {
                setCurrent(index);
              }}
            >
              <p>{item?.title}</p>
            </div>
          );
        })}
      </div>
      {current == 0 && (
        <div className="flex gap-[20px] flex-col">
          <div className="flex gap-[20px] max-lg:hidden">
            {dataMethod?.map((item: any, index: number) => {
              if (item.id === 0 && isUseBank === "true") {
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }else if (item.id === 1 && isUsePaypal === "true") {
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }else if (item.id === 2){
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }else if (item.id === 3 && isUsePerfectMoney === "true") {
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }
            })}
          </div>
          {/* ---------------------------------- RESPONSIVE ---------------------------------- */}
          <div className="hidden max-lg:flex gap-[20px] flex-col">
            {dataMethod?.map((item: any, index: number) => {
              if (item.id === 0 && isUseBank === "true") {
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }else if (item.id === 1 && isUsePaypal === "true") {
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }else if (item.id === 3 && isUsePerfectMoney === "true") {
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }else if (item.id === 2){
                return (
                  <OneMethod
                    key={index}
                    index={index}
                    currentMethod={currentMethod}
                    setCurrentMethod={setCurrentMethod}
                    item={item}
                    flag={1}
                  />
                );
              }
            })}
          </div>
          {/*==================== END ==============================*/}
          <div>
            {currentMethod == 1 && <FormPayment />}
            {currentMethod == 0 && <FormPaymentBank />}
            {currentMethod == 2 && (
              <div className=" text-[18px] font-bold flex flex-col border-1 border-gray-300 rounded-[10px] p-[20px] gap-[20px]">
                <div>Liên hệ trực tiếp</div>
                <SupportInformation flag={1} />
              </div>
            )}
            {currentMethod == 3 && <FormPerfectMoney />}
          </div>
        </div>
      )}
      {current == 1 && <History />}
    </div>
  );
}

const OneMethod = ({
  index,
  currentMethod,
  setCurrentMethod,
  item,
  flag,
}: any) => {
  return (
    <div
      className={
        flag == 1
          ? currentMethod == index
            ? "flex border-1 border-[#FF8900] p-[20px] w-full rounded-[12px] justify-between items-center"
            : "flex border-1 border-gray-200 p-[20px] w-full rounded-[12px] justify-between items-center"
          : currentMethod == index
          ? "flex border-1 border-[#FF8900] p-[20px] w-full rounded-[12px] justify-between items-center"
          : "flex border-1 border-gray-200 p-[20px] w-full rounded-[12px] justify-between items-center"
      }
      onClick={() => {
        setCurrentMethod(index);
      }}
    >
      <div className="flex gap-[12px]">
        <MstCheckbox id="1" isChecked={currentMethod === index ? true : false}>
          <MstCheckbox.Indicator></MstCheckbox.Indicator>
        </MstCheckbox>
        <p>{item?.title}</p>
      </div>
      {item?.icon}
    </div>
  );
};
