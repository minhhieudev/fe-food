import {
  SVGFB,
  SVGGoogle,
  SVGTiktok,
  SVGYoutube,
  SVGTelegram,
  SVGTwitter,
  SVGInstagram,
} from "../asset/svgs";
import { Config } from "../../core/constants/configs";

const Platform = [
  {
    id: 0,
    icon: <SVGFB />,
    iconLarge: <SVGFB width={50} height={50} />,
    iconSmall: <SVGFB width={80} height={80} />,
    name: "Facebook",
    code: "facebook",
  },
  {
    id: 1,
    icon: <SVGYoutube />,
    iconLarge: <SVGYoutube width={50} height={50} />,
    iconSmall: <SVGYoutube width={80} height={80} />,
    name: "Youtube",
    code: "youtube",
  },
  {
    id: 2,
    icon: <SVGGoogle />,
    iconLarge: <SVGGoogle width={50} height={50} />,
    iconSmall: <SVGGoogle width={80} height={80} />,
    name: "Google",
    code: "google",
  },
  {
    id: 3,
    icon: <SVGTiktok />,
    iconLarge: <SVGTiktok width={50} height={50} />,
    iconSmall: <SVGTiktok width={80} height={80} />,
    name: "Tiktok",
    code: "tiktok",
  },
  {
    id: 4,
    icon: <SVGTelegram />,
    iconLarge: <SVGTelegram width={50} height={50} />,
    iconSmall: <SVGTelegram width={80} height={80} />,
    name: "Telegram",
    code: "telegram",
  },
  {
    id: 5,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/twitter.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/twitter.png`}
        width={50}
        height={50}
      />
    ),
    iconSmall: (
      <img
        src={`${Config.API_SERVER}/images/services/twitter.png`}
        width={80}
        height={80}
      />
    ),
    name: "Twitter",
    code: "twitter",
  },
  {
    id: 6,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/instagram.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/instagram.png`}
        width={50}
        height={50}
      />
    ),
    iconSmall: (
      <img
        src={`${Config.API_SERVER}/images/services/instagram.png`}
        width={80}
        height={80}
      />
    ),
    name: "Instagram",
    code: "instagram",
  },
  {
    id: 7,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/shopee.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/shopee.png`}
        width={50}
        height={50}
      />
    ),
    iconSmall: (
      <img
        src={`${Config.API_SERVER}/images/services/shopee.png`}
        width={80}
        height={80}
      />
    ),
    name: "Shopee",
    code: "shopee",
  },
  {
    id: 8,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/other.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/other.png`}
        width={50}
        height={50}
      />
    ),
    iconSmall: (
      <img
        src={`${Config.API_SERVER}/images/services/other.png`}
        width={80}
        height={80}
      />
    ),
    name: "Khác",
    code: "other",
  },
];
const ChoosePlatform = [
  {
    id: 1,
    icon: <SVGFB />,
    iconLarge: <SVGFB width={50} height={50} />,
    name: "FaceBook",
    code: "facebook",
  },
  {
    id: 2,
    icon: <SVGYoutube />,
    iconLarge: <SVGYoutube width={50} height={50} />,
    name: "Youtube",
    code: "youtube",
  },
  {
    id: 3,
    icon: <SVGGoogle />,
    iconLarge: <SVGGoogle width={50} height={50} />,
    name: "Google",
    code: "google",
  },
  {
    id: 4,
    icon: <SVGTiktok />,
    iconLarge: <SVGTiktok width={50} height={50} />,
    name: "Tiktok",
    code: "tiktok",
  },
  {
    id: 5,
    icon: <SVGTelegram />,
    iconLarge: <SVGTelegram width={50} height={50} />,
    name: "Telegram",
    code: "telegram",
  },
  {
    id: 6,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/twitter.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/twitter.png`}
        width={50}
        height={50}
      />
    ),
    name: "Twitter",
    code: "twitter",
  },
  {
    id: 7,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/instagram.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/instagram.png`}
        width={50}
        height={50}
      />
    ),
    name: "Instagram",
    code: "instagram",
  },
  {
    id: 8,
    icon: (
      <img
        src={`${Config.API_SERVER}/images/services/other.png`}
        width={24}
        height={24}
      />
    ),
    iconLarge: (
      <img
        src={`${Config.API_SERVER}/images/services/other.png`}
        width={50}
        height={50}
      />
    ),
    name: "Khác",
    code: "other",
  },
];
const SelectServiceName = [
  {
    id: 0,
    code: "ServiceName",
    name: "Nhập Tên dịch vụ",
  },
];

export { Platform, SelectServiceName, ChoosePlatform };
