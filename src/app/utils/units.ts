import * as yup from "yup";
const moment = require("moment");
import { Config } from "../../core/constants/configs";

const validateForm = yup.object({
  qty: yup
    .number()
    .integer("Không nhập số thập phân")
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Vui lòng không bỏ trống")
    .notOneOf([0], "Giá trị phải lớn hơn 0"),
  customerEnteredValues: yup.array(
    yup.object({
      attributeCode: yup.string().required(),
      enteredValue: yup.string().required(),
    })
  ),
  intervalTime: yup.number(),
});
const validateFormChangePassWord = yup.object({
  oldPassword: yup
    .string()
    .required("Vui lòng không bỏ trống")
    .min(6, "Mật khẩu có độ dài từ 6-24 ký tự")
    .max(24, "Mật khẩu có độ dài từ 6-24 ký tự"),
  newPassword: yup
    .string()
    .required("Vui lòng không bỏ trống")
    .min(6, "Mật khẩu có độ dài từ 6-24 ký tự")
    .max(24, "Mật khẩu có độ dài từ 6-24 ký tự")
    .matches(/^[a-zA-Z0-9]*$/, "Mật khẩu không được chứa ký tự đặc biệt"),
  checkNewPass: yup
    .string()
    .required("Vui lòng không bỏ trống")
    .oneOf([yup.ref("newPassword")], "Mật khẩu mới không trùng nhau"),
});
const validateFormRegister = yup.object({
  email: yup
    .string()
    .email("ví dụ: example@gmail.com")
    .required("Email không được bỏ trống"),
  passWord: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(6, "Mật khẩu yêu cầu trên 6 ký tự và không quá 32 ký tự")
    .max(52, "Mật khẩu yêu cầu trên 6 ký tự và không quá 32 ký tự"),
});
const formatPriceVND = (data?: number) => {
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const price = new Intl.NumberFormat("vi-VN", config)
    .format(data || 0)
    .slice(0, -1);
  return price;
};

const takeTimeCustom = (data: any) => {
  switch (data) {
    case "today":
      let today =
        moment().subtract(0, "days").format("YYYY-MM-DD") + "T" + "00:00:00";

      return { first: today, end: "" };
      break;
    case "preDay":
      let preDay =
        moment().subtract(1, "days").format("YYYY-MM-DD") + "T" + "00:00:00";

      return { first: preDay, end: "" };
      break;
    case "pre30":
      let todayPre30 = moment();
      let endPre30 =
        todayPre30.subtract(0, "days").format("YYYY-MM-DD") + "T" + "23:59:59";
      let firstPre30 =
        todayPre30.subtract(30, "days").format("YYYY-MM-DD") + "T" + "00:00:00";
      return { first: firstPre30, end: endPre30 };
      break;
    case "thisMonth":
      let startOfMonth =
        moment().startOf("month").format("YYYY-MM-DD") + "T" + "00:00:00";
      let todayMonth = moment().format("YYYY-MM-DD") + "T" + "23:59:59";
      return { first: startOfMonth, end: todayMonth };
      break;
    case "preMonth":
      let startOfLastMonth =
        moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD") +
        "T" +
        "00:00:00";
      let endOfLastMonth =
        moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD") +
        "T" +
        "23:59:59";
      return { first: startOfLastMonth, end: endOfLastMonth };
      break;
  }
};

function shortenContent(content: string, maxLength = 40) {
  try {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    } else {
      return content;
    }
  } catch (error) {
    return content;
  }
}

/*
  Người viết: Đinh Văn Thành
  ngày viết: 20-05-2024
  Chức năng: nhận biết được kích thức của màn hình khi co gian màn hình
*/
function getClientSize() {
  var width = 0,
    height = 0;

  if (typeof window.innerWidth == "number") {
    width = window.innerWidth;
    height = window.innerHeight;
  } else if (
    document.documentElement &&
    (document.documentElement.clientWidth ||
      document.documentElement.clientHeight)
  ) {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  } else if (
    document.body &&
    (document.body.clientWidth || document.body.clientHeight)
  ) {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }

  return { width: width, height: height };
}
/*
  Người viết: Đinh văn thành
  Ngày viết: 21-05-2024 
  Chức năng: validate trường email khi người dùng nhập từ ô input 
*/
function validateEmail(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
const dataApi = [
  {
    "key":"All service packages",
    "method":"get",
    "url": `GET ${Config.API_SERVER}public-api/service-packages`,
    "contentType": "application/json",
    "Authorization": "Bearer {{apiKey}}",
    "Body":{
      "success": "true",
      "servicePackages":[
        {
          "_id": "664f45f45c4630cc75a53e68",
          "name": "1dg fb share 12",
          "code": "1716471284872341",
          "description": "",
          "scriptGroupCode": "facebook",
          "serviceGroup": {
            "_id": "664f45bc5c4630cc75a53e62",
            "name": "Youtube"
          },
          "serviceTags": [
            "youtube"
          ],
          "price": 168,
          "vipPrice": null,
          "originPrice": null,
          "attributes": [
            {
              "label": "Link",
              "code": "link",
              "description": "",
              "dataType": "text",
              "required": true,
              "commentType": false,
              "_id": "664f45f45c4630cc75a53e69"
            }
          ],
          "minValue": 10,
          "maxValue": 10000
        },
        {
          "_id": "664c4e078502d05024f7c120",
          "name": "Youtube new",
          "code": "1716276743565900",
          "description": "",
          "scriptGroupCode": "youtube",
          "serviceGroup": {
            "_id": "664c4dfb8502d05024f7c11b",
            "name": "Tăng mắt livestream"
          },
          "serviceTags": [
            "youtube"
          ],
          "price": 100,
          "vipPrice": -1,
          "originPrice": null,
          "attributes": [
            {
              "label": "Đường dẫn Youtube",
              "code": "DDY",
              "description": "",
              "dataType": "text",
              "required": true,
              "commentType": false,
              "_id": "664c4e078502d05024f7c121"
            }
          ],
          "minValue": 0,
          "maxValue": 0
        }
      ]
    }
  },
  {
    "key":"Add order",
    "method": "post",
    "url": `POST ${Config.API_SERVER}public-api/create-order`,
    "contentType": "application/json",
    "Authorization": "Bearer {{apiKey}}",
    "body":{
      "serviceID": "664c4e078502d05024f7c120",
      "qty": 1,
      "customerEnteredValues": [
          {
              "attributeCode": "DDY",
              "enteredValue": "https://www.youtube.com/watch?v=bQknXTIJeoo&list=RDbQknXTIJeoo&start_radio=1"
          },
          {
              "attributeCode": "SDT",
              "enteredValue": "0966668888"
          }
      ]
    },
    "Body":{
      "success": true,
      "message": "Đặt hàng thành công"
    }
  },
  {
    "key":"Get balance",
    "method":"get",
    "url": `GET ${Config.API_SERVER}public-api/get-balance`,
    "contentType": "application/json",
    "Authorization": "Bearer {{apiKey}}",
    "Body":{
      "success": true,
      "data": {
          "wallet": {
              "_id": "66456280d8add8caf0c7b94e",
              "balance": 401591
          }
      }
    }
  },
  {
    "key":"Get order status",
    "method":"get",
    "url": `GET ${Config.API_SERVER}public-api/get-order-status/orderID`,
    "contentType": "application/json",
    "Authorization": "Bearer {{apiKey}}",
    "param":{
      "orderID": "66501999cc78c2137c3500b8"
    },
    "Body":{
      "success": true,
      "data": {
          "order": {
              "_id": "66501999cc78c2137c3500b8",
              "status": "running"
          }
      }
    }
  }
]
export {
  formatPriceVND,
  validateForm,
  takeTimeCustom,
  validateFormRegister,
  shortenContent,
  getClientSize,
  validateEmail,
  validateFormChangePassWord,
  dataApi,
};
