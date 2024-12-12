import { LANG } from "@/app/utils/language/language";
import { useAppSelector } from "../services/hook";

function capitalizeFirstChar(str: string) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const useTranslate = (window: Window) => {
  const currentLang = window.localStorage.getItem(LANG.KEY) || "vi";
  const translateData = useAppSelector((state) => state.setting.translateData);

  const translate = (key: string) => {
    return translateData?.[key]?.[currentLang] || key;
  };

  const getServiceName = (serviceCode: string) => {
    const serviceCodeSplit = serviceCode.split("_");
    const serviceNameMap = serviceCodeSplit.map((key: string) => {
      return translate(key);
    });
    serviceNameMap.shift()
    return capitalizeFirstChar(serviceNameMap.join(" "));
  };

  return {
    translate,
    getServiceName,
  };
};
