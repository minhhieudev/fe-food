"use client";
import { useTranslate } from "@/core/hooks/useTranslateData";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { AuthSelectors } from "@/modules/auth/slice";
import { CurrencySelector } from "@/modules/currency/slice";
import { PaymentActions } from "@/modules/payment/slice";
import {
  ServiceOrderActions,
  ServiceOrderSelectors,
} from "@/modules/services.order/slice";
import { CalendarIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, EyeIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Config } from "../../core/constants/configs";
import DropDownPlatformMultiSelect from "../components/DropDownPlatformMultiSelect";
import DropDownTimeTemplate from "../components/DropDownPlatformMultiSelect/DropDownTimeTemplate";
import DropDownStatus from "../components/DropDownStatus";
import Search from "../components/MainScreen/Search";
import ShowTitle from "../components/ShowTitle";
import { Language } from "../utils/language/language";
import ModalDetails from "./ModalDetails";

export default function Bought() {
  const lang = new Language(window);
  const { getServiceName } = useTranslate(window);
  const router = useRouter();
  
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  const currency = useAppSelector(CurrencySelector.currency);

  const [isShowModal, setIsShowModal] = useState(false);
  const [dataModal, setDataModal] = useState<any>();

  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const dataOrder = useSelector(ServiceOrderSelectors?.serviceOrder);

  const [platform, setPlatform] = useState<any>([]);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [flag, setFlag] = useState(false);
  const [current, setCurrent] = useState<any>(undefined);
  const client = useSelector(AuthSelectors.client);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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
          servicePackage: e?.servicePackage,
          customerEnteredValues: e?.servicePackage?.customerEnteredValues,
          status: e?.status,
          totalPrice: e?.totalPrice,
          intervalTime: e?.servicePackage?.intervalTime,
          _id: e._id,
          scriptCode: e?.servicePackage?.scriptCode,
        });
        return arr;
      });
      let targetArray: any[] = convertArray(dataCheck, page, pageSize);
      
      console.log("Sample image URL:", Config.CDN_URL + (targetArray.length > 0 ? targetArray[0].mainImage : ''));
      
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

  const handleChangeSearch = (e: any) => {
    setSearch(e);
  };

  const handleSearch = () => {
    getOrderConfig(status, start, end, pageSize, page);
  };

  const handleOpenModal = (data: any) => {
    setDataModal(data);
    setIsShowModal(true);
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: any = {
      running: {
        color: "bg-blue-100 text-blue-800",
        text: "Đang chạy",
        icon: <ClockIcon className="w-4 h-4 mr-1" />
      },
      completed: {
        color: "bg-emerald-100 text-emerald-800",
        text: "Hoàn thành",
        icon: <CheckCircleIcon className="w-4 h-4 mr-1" />
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        text: "Đã hủy bỏ",
        icon: <XCircleIcon className="w-4 h-4 mr-1" />
      }
    };

    const statusInfo = statusMap[status] || statusMap.cancelled;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.icon}
        {statusInfo.text}
      </span>
    );
  };

  return (
    <>
      <ShowTitle title={lang.gen("menu.bought")} />
      
      {/* Mobile search and filter */}
      <div className="lg:hidden p-4 space-y-4">
        <div className="flex gap-4 w-full justify-between">
          <div className="w-full">
            <Search
              title={lang.gen("bought.input-service-name")}
              handleChangeSearch={handleChangeSearch}
              handleSearch={handleSearch}
            />
          </div>
          <button
            onClick={toggleFilters}
            className="flex items-center gap-2 bg-white border border-gray-300 p-3 rounded-lg shadow-sm text-gray-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Bộ lọc
          </button>
        </div>

        {isFiltersVisible && (
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4 transition-all duration-300">
            <DropDownStatus
              title="test"
              handleCheckStatus={handleCheckStatus}
              status={status}
            />
            <DropDownPlatformMultiSelect
              handleCheckPlatform={handleCheckPlatform}
              platform={platform}
            />
            <DropDownTimeTemplate handlePicker={handlePicker} start={start} />
            
            {(platform.length > 0 || start !== "" || end !== "" || search !== "" || status !== "") && (
              <button
                onClick={handleDelete}
                className="w-full flex justify-center items-center gap-2 bg-red-500 text-white p-3 rounded-lg"
              >
                <TrashIcon className="w-5 h-5" />
                {lang.gen("menu.bought.delete")}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-6">
        <ModalDetails
          isOpen={isShowModal}
          handleClose={handleCloseModal}
          data={dataModal}
        />
        
        {/* Desktop filters */}
        <div className="hidden lg:block bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex gap-4 items-center">
            <DropDownStatus
              title="test"
              handleCheckStatus={handleCheckStatus}
              status={status}
            />
            <div className="flex flex-col w-full">
              <Search
                title={lang.gen("bought.input-service-name")}
                handleChangeSearch={handleChangeSearch}
                handleSearch={handleSearch}
              />
            </div>
            <DropDownPlatformMultiSelect
              handleCheckPlatform={handleCheckPlatform}
              platform={platform}
            />
            <DropDownTimeTemplate handlePicker={handlePicker} start={start} />

            {(platform.length > 0 || start !== "" || end !== "" || search !== "" || status !== "") && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-colors duration-200"
              >
                <TrashIcon className="w-5 h-5" />
                <span>{lang.gen("menu.bought.delete")}</span>
              </button>
            )}
          </div>
        </div>

        {/* Order cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rows.map((order: any, index: number) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group hover:border-emerald-200"
            >
              {/* Card header with status and better styling */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <span className="text-emerald-600 mr-1">#</span>{order.code}
                </h3>
                {getStatusBadge(order.status)}
              </div>
              
              {/* Service image with overlay */}
              <div className="relative h-48 overflow-hidden group">
                <img 
                  src={Config.CDN_URL + order.mainImage}
                  alt={getServiceName(order.serviceCode) || order.description}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                    console.log('Image failed to load:', Config.CDN_URL + order.mainImage);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <p className="text-white font-medium">{getServiceName(order.serviceCode) || order.description}</p>
                </div>
              </div>
              
              {/* Service info */}
              <div className="p-4 flex-grow">
                {order.customerEnteredValues && order.customerEnteredValues.map((x: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm mb-1">
                    <span className="text-emerald-600 font-medium whitespace-nowrap">{x?.label || x?.attributeCode}:</span>
                    <span className="text-gray-700 line-clamp-1">{x?.enteredValue}</span>
                  </div>
                ))}
              </div>
              
              {/* Card footer with price and date */}
              <div className="bg-gray-50 p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{order._date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{order._time}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <h5 className="font-bold text-gray-800">Tổng tiền:</h5>
                  <div className="font-bold text-emerald-600 flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 mr-1" />
                    {Number((Number(order?.totalPrice) * Number(current?.exchangeRate)).toFixed(5))} {current?.code}
                  </div>
                </div>
              </div>
              
              {/* View details button with improved styling */}
              <button 
                onClick={() => router.push(`/orderFood/meal?orderID=${order._id}`)}
                className="bg-emerald-600 group-hover:bg-emerald-700 text-white font-medium p-3 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <EyeIcon className="w-5 h-5" />
                  Xem chi tiết đơn hàng
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => onChangePage(pageNum)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    pageNum === page
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* No results */}
        {rows.length === 0 && !flag && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mb-4">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-1">Không tìm thấy đơn hàng nào</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
          </div>
        )}
        
        {/* Loading indicator */}
        {flag && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        )}
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
      TotalAmount: item[0].intervalTime || 0,
      action: "action",
      code: item[0].code || "",
      status: item[0].status || "",
      mainImage: item[0].servicePackage?.mainImage || "",
      colorStatus: convertStatus(item[0].status).key || "",
      chanel: item[0].name || "",
      customerEnteredValues: item[0].customerEnteredValues,
      start: item[0].startAt >= 0 ? item[0].startAt : "",
      remaining: item[0].remaining ? item[0].remaining : "",
      qty: item[0].qty || "",
      totalPrice: item[0].totalPrice || "",
      _time: moment(item[0].createdAt).format("HH:mm:ss") || "",
      _date: moment(item[0].createdAt).format("DD-MM-YYYY") || "",
      _logo:
        `${Config.API_SERVER}/images/services/${item[0].scriptGroupCode ? item[0].scriptGroupCode : item[0].scriptCode
        }.png` || "",
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
