"use client";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import {
  ServiceOrderActions,
  ServiceOrderSelectors,
} from "@/modules/services.order/slice";
import { Tooltip, getKeyValue } from "@nextui-org/react";
import moment from "moment";
import { Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownPlatformMultiSelect from "../components/DropDownPlatformMultiSelect";
import DropDownTimeTemplate from "../components/DropDownPlatformMultiSelect/DropDownTimeTemplate";
import DropDownStatus from "../components/DropDownStatus";
import TextInput from "../components/InputText";
import CustomTableBought from "../components/Table/CustomTableBought";
import { Language } from "../utils/language/language";
import ModalDetails from "./ModalDetails";
import ShowTitle from "../components/ShowTitle";
import { PaymentActions } from "@/modules/payment/slice";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { shortenContent } from "../utils/units";
import { Config } from "../../core/constants/configs";
import { CurrencySelector } from "@/modules/currency/slice";
import Search from "../components/MainScreen/Search";
import { SVGFilter } from "../asset/svgs";
import { useTranslate } from "@/core/hooks/useTranslateData";
import { usePathname, useRouter } from "next/navigation";
import { AuthSelectors } from "@/modules/auth/slice";

export default function Bought() {
  const lang = new Language(window);
  const { getServiceName } = useTranslate(window);

  const headCells: any[] = [
    {
      key: "CodeOrders",
      name: lang.gen("perchasedServices.CodeOrders"),
    },
    {
      key: "service",
      name: lang.gen("perchasedServices.servicesName"),
    },
    {
      key: "PurchaseInformation",
      name: lang.gen("perchasedServices.PurchaseInformation"),
    },
    {
      key: "TotalAmount",
      name: lang.gen("perchasedServices.TotalAmount"),
    },
    {
      key: "time",
      name: lang.gen("perchasedServices.DateOfPurchase"),
    },
    {
      key: "action",
      name: 'Thao tác',
    },
  ];

  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  const currency = useAppSelector(CurrencySelector.currency);

  const [isShowModal, setIsShowModal] = useState(false);

  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const dataOrder = useSelector(ServiceOrderSelectors?.serviceOrder);
  const [dataModal, setDataModal] = useState();

  const [platform, setPlatform] = useState<any>([]);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [flag, setFlag] = useState(false);
  const [current, setCurrent] = useState<any>(undefined);
  const client = useSelector(AuthSelectors.client);
  const getOrderConfig = (
    _status: any,
    _start: any,
    _end: any,
    _pageSize: any,
    _page: any
  ) => {
    setFlag(true);
    dispatch(
      ServiceOrderActions.getOrderList({
        page: _page ? _page : page,
        pageSize: _pageSize ? _pageSize : pageSize,
        name: search,
        status: _status ? _status : status,
        scriptGroupCode: JSON.stringify(platform),
        startDay: _start ? _start : start,
        endDay: _end ? _end : end,
      })
    );
  };
  useEffect(() => {
    if (platform && start && end && search && status) {
      getOrderConfig(status, start, end, pageSize, page);
    }
  }, [platform, start, end, search, status]);
  useEffect(() => {
    dispatch(ServiceOrderActions.getOrderList({}));
  }, []);

  useEffect(() => {
    if (dataOrder) {
      let flag_status = false
      setFlag(true);
      setTotalPage(dataOrder?.pagination?.totalPage);
      setPage(dataOrder?.pagination?.page);
      let arr: Array<string> = []
      dataOrder?.orders?.map((e: any) => {
        if (e.status === 'running') {
          flag_status = true
          arr.push(e?._id);
        }
      });

      let dataCheck = dataOrder?.orders.map((e: any) => {
        let arr = [];
        arr.push({
          createdAt: e.createdAt,
          scriptGroupCode: e?.servicePackage?.scriptGroupCode,
          plaform: e?.servicePackage?.scriptGroupCode,
          name: e?.servicePackage?.name,
          code: e?.code,
          qty: e?.servicePackage?.qty,
          customerEnteredValues:
            e?.servicePackage?.customerEnteredValues,
          price: e?.servicePackage?.price,
          status: e?.status,
          totalPrice: e?.totalPrice,
          intervalTime: e?.servicePackage?.intervalTime,
          _id: e._id,
          scriptCode: e?.servicePackage?.scriptCode,
        });
        return arr;
      });
      let targetArray: any[] = convertArray(dataCheck, page, pageSize);
      setRows(targetArray);
      setFlag(false);
    }
  }, [dataOrder]);

  useEffect(() => {
    setCurrent(currency);
    getOrderConfig(status, start, end, pageSize, page);
  }, [currency]);

  const onChangePage = (newPage: number) => {
    getOrderConfig(status, start, end, pageSize, newPage);
    setPage(newPage);
  };
  const handleChangePageSize = (newPageSize: number) => {
    getOrderConfig(status, start, end, newPageSize, page);
    setPageSize(newPageSize);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  const handleChangeService = (e: any) => {
    setSearch(e.target.value);
  };
  const handleCheckStatus = (e: string) => {
    getOrderConfig(e, start, end, pageSize, page);
    setStatus(e);
  };
  const handleCheckPlatform = (e: any) => {
    setPlatform([]);
    let datacode = e.map((item: any) => {
      return item.code;
    });
    setPlatform(datacode);
  };

  const handlePicker = (e: any) => {
    getOrderConfig(status, e.startDate, e.endDate, pageSize, page);
    setStart(e.startDate);
    setEnd(e.endDate);
  };

  useEffect(() => {
    const timeOutId = setTimeout(
      () => getOrderConfig(status, start, end, pageSize, page),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [search]);
  useEffect(() => {
    const timeOutIdPlatform = setTimeout(
      () => getOrderConfig(status, start, end, pageSize, page),
      500
    );
    return () => clearTimeout(timeOutIdPlatform);
  }, [platform]);

  useEffect(() => {
    dispatch(PaymentActions.getWallet({}));
  }, []);
  const handleDelete = () => {
    setSearch("");
    setStatus("");
    setPlatform([]);
    setStart("");
    setEnd("");
  };

  const getStyleColumn = (key: string): React.CSSProperties => {
    if (key === "TotalAmount") return { textAlign: "center" };
    if (key === "time") return { textAlign: "center" };
    if (key === "PurchaseInformation") return { textAlign: "center" };
    if (key === "service") return { textAlign: "center" };
    if (key === "plaform") return { textAlign: "center" };
    if (key === "CodeOrders") return { textAlign: "center" };
    if (key === "action") return { textAlign: "center" };
    return {};
  };

  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };
  const handleSearch = () => {
    getOrderConfig(status, start, end, pageSize, page);
  };
  const router = useRouter();

  return (
    <>
      <ShowTitle title={lang.gen("menu.bought")} />
      <div className="hidden max-lg:flex rounded-xl px-6 gap-4 w-full justify-between">
        <div className="w-[100%]">
          <Search
            title={lang.gen("bought.input-service-name")}
            handleChangeSearch={handleChangeSearch}
            handleSearch={handleSearch}
          />
        </div>
        <div className="flex w-[100px] gap-1 border-1 border-gray-300 p-2 rounded-[4px] items-center font-semibold text-[#72777A] cursor-pointer filter-bought">
          <SVGFilter />
          <p>Bộ lọc</p>
        </div>
      </div>
      <div className=" border-[1px] border-solid border-[#E3E5E5] py-4 m-6 mr-2 rounded-lg ">
        <div className="p-1 flex flex-col justify-center">
          <ModalDetails
            isOpen={isShowModal}
            handleClose={handleCloseModal}
            data={dataModal}
          />
          <div className="rounded-xl bg-white px-6 flex gap-6 w-full max-lg:hidden">
            <DropDownStatus
              title="test"
              handleCheckStatus={handleCheckStatus}
              status={status}
            />
            <div className="flex flex-col w-full">
              <TextInput
                placeholder={lang.gen("bought.input-service-name")}
                type="text"
                onChange={handleChangeService}
                search={search}
              />
            </div>
            <DropDownPlatformMultiSelect
              handleCheckPlatform={handleCheckPlatform}
              platform={platform}
            />
            <DropDownTimeTemplate handlePicker={handlePicker} start={start} />

            {platform.length > 0 ||
              start != "" ||
              end != "" ||
              search != "" ||
              status != "" ? (
              <div
                onClick={handleDelete}
                className={
                  lang.gen("menu.bought.delete") == "Delete filter"
                    ? "w-[38rem] gap-2 bg-[#FF5247] flex p-2 text-white rounded-md cursor-pointer"
                    : "w-[32rem] gap-2 bg-[#FF5247] flex p-2 text-white rounded-md cursor-pointer"
                }
              >
                <TrashIcon className="w-6 h-6" />
                <button>{lang.gen("menu.bought.delete")}</button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className=" p-2 h-full">
            <CustomTableBought
              headCells={headCells}
              rows={rows}
              page={page}
              pageSize={pageSize}
              totalPage={totalPage}
              total={dataOrder?.pagination.total}
              onChangePage={onChangePage}
              getStyleColumn={getStyleColumn}
              onChangePageSize={handleChangePageSize}
              renderCell={(row, columnKey) => {
                let value = getKeyValue(row, columnKey as string);
                switch (columnKey) {
                  case "CodeOrders":
                    return (
                      <div className="">
                        <h1 className="text-base text-[#090A0A] font-bold">
                          {row?.code}
                        </h1>
                        <p className={`text-[${row?.colorStatus}]`}> {row?.status}</p>
                      </div>
                    );
                    break;
                  case "service":
                    return (
                      <div className="">
                        <div className="text-base text-[#090A0A] font-bold max-w-lg truncate">
                          {row?.serviceCode
                            ? getServiceName(row.serviceCode)
                            : row?.description}{" "}
                        </div>
                        {row?.customerEnteredValues.map(
                          (x: any, index: any) => {
                            return (
                              <div key={`${index}`}>
                                <p className="text-[#FF8900]">
                                  {x?.label ? x?.label : x?.attributeCode}:{" "}
                                  <span className="text-[#090A0A]">
                                    {shortenContent(x?.enteredValue)}
                                  </span>
                                </p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    );
                    break;
                  case "PurchaseInformation":
                    return (
                      <div className="w-[150px]">
                        <p className="text-[#FF8900]">
                          Bắt đầu từ:{" "}
                          <span className="text-[#090A0A] text-base">
                            {row?.start}
                          </span>
                        </p>
                        <p className="text-[#FF8900]">
                          Số lượng còn lại:{" "}
                          <span className="text-[#090A0A] text-base">
                            {row?.remaining}
                          </span>
                        </p>
                      </div>
                    );
                    break;
                  case "TotalAmount":
                    return (
                      <div className="w-[250px] flex flex-col ">
                        <p className="text-[#FF8900]">
                          Giá:{" "}
                          <span className="text-[#090A0A] text-base">
                            {Number(
                              (
                                Number(row?.pice) *
                                Number(current?.exchangeRate)
                              ).toFixed(5)
                            )}{" "}
                            {current?.code}
                          </span>
                        </p>
                        <p className="text-[#FF8900]">
                          Tổng tiền:{" "}
                          <span className="text-[#090A0A] text-base">
                            {Number(
                              (
                                Number(row?.totalPrice) *
                                Number(current?.exchangeRate)
                              ).toFixed(5)
                            )}{" "}
                            {current?.code}
                          </span>
                        </p>
                      </div>
                    );
                    break;
                  case "time":
                    return (
                      <div className="flex justify-center w-[150px] text-[#72777A] pl-1">
                        <div className="">
                          <p className="text-base pb-2 pl-3">{row?._time}</p>
                          <p className="text-base">{row?._date}</p>
                        </div>
                      </div>
                    );
                    break;
                  case "action":
                    return (
                      <div className="flex justify-center w-[150px] text-[#72777A] pl-1">
                        <div className="">
                          <button onClick={() => { router.push(`/orderFood/meal?orderID=${row?._id}`) }}>
                            <EyeIcon color="green" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                    break;
                }
                return null;
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
function convertArray(
  originalArray: any[],
  page: number,
  pageSize: number
): any[] {
  return originalArray?.map((item, index) => {
    return {
      _id: item[0]._id || "",
      plaform: item[0].scriptGroupCode
        ? item[0].scriptGroupCode
        : item[0].scriptCode || "",
      description: item[0].name || "",
      serviceCode: item[0].serviceCode || "",
      types: item[0].code || "",
      PurchaseInformation: item[0].qty || "",
      TotalAmount: item[0].intervalTime || 0,
      action: "action",
      code: item[0].code || "",
      status: convertStatus(item[0].status).value || "",
      colorStatus: convertStatus(item[0].status).key || "",
      chanel: item[0].name || "",
      customerEnteredValues: item[0].customerEnteredValues,
      start: item[0].startAt >= 0 ? item[0].startAt : "",
      remaining: item[0].remaining ? item[0].remaining : "" || "",
      pice: item[0].price || "",
      qty: item[0].qty || "",
      totalPrice: item[0].totalPrice || "",
      _time: moment(item[0].createdAt).format("HH:mm:ss") || "",
      _date: moment(item[0].createdAt).format("DD-MM-YYYY") || "",
      _logo:
        `${Config.API_SERVER}/images/services/${item[0].scriptGroupCode ? item[0].scriptGroupCode : item[0].scriptCode
        }.png` || "",
      // Các thuộc tính khác của mảng đích
    };
  });
}
function convertStatus(status: string) {
  if (status == "running") {
    return (
      {
        key: "#FF8900",
        value: "Đang chạy"
      }
    );
  } else if (status == "completed") {
    return (
      {
        key: "#23C16B",
        value: "Hoàn thành"
      }
    );
  } else {
    return (
      {
        key: "#090A0A",
        value: "Đã hủy bỏ"
      }
    );
  }
}
