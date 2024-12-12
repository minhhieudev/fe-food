"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomTable, { HeadCellBase } from "../components/Table/CustomTable";
import { useAppDispatch, useAppSelector } from "@/core/services/hook";
import { useSelector } from "react-redux";
import { PaymentSelectors, PaymentActions } from "@/modules/payment/slice";
import { getKeyValue } from "@nextui-org/react";
import { formatPriceVND } from "../utils/units";
import { Language } from "../utils/language/language";
import { CurrencySelector } from "@/modules/currency/slice";
import CustomTableHistoryPayment from "../components/Table/CustomTableHistoryPayment";

interface Props {
  dataHistory?: any;
  currency?: any;
}
export default function HistoryTable(props: Props) {
  const { dataHistory, currency } = props;
  const lang = new Language(window);

  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const getOrderConfig = useCallback(
    ({
      page = 1,
      pageSize = 20,
      fromDate,
      toDate,
    }: {
      page: number;
      pageSize: number;
      fromDate?: any;
      toDate?: any;
    }) => {
      dispatch(
        PaymentActions.getPaymentHistory({
          onSuccess(e: any) {},
          page: page,
          pageSize: pageSize,
          fromDate,
          toDate,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setTotalPage(dataHistory?.data.pagination.totalPage);
    setPage(dataHistory?.data.pagination.page);
    let targetArray: any[] = convertArray(
      dataHistory?.data.paymentActivities,
      page,
      pageSize
    );
    setRows(targetArray);
  }, [dataHistory, currency]);
  const onChangePage = (newPage: number) => {
    if (page == newPage) return;
    setPage(newPage);
    getOrderConfig({ page: newPage, pageSize });
  };
  const handleChangePageSize = (newPageSize: number) => {
    if (newPageSize > (dataHistory?.pagination?.totalPages || 0) / page) {
      setTotalPage(1);
      setPage(1);
      setPageSize(newPageSize);
      getOrderConfig({ page: 1, pageSize: newPageSize });
    } else {
      setPageSize(newPageSize);
      getOrderConfig({ page, pageSize: newPageSize });
    }
  };

  const headCells: any[] = [
    HeadCellBase.numberOrder,
    {
      key: "method",
      name: lang.gen("payment.method"),
    },
    {
      key: "total",
      name: lang.gen("payment.totalRecharge"),
    },
    {
      key: "increase",
      name: lang.gen("payment.increase"),
    },
    {
      key: "status",
      name: lang.gen("payment.status"),
    },
    {
      key: "balance",
      name: lang.gen("payment.balance"),
    },
    {
      key: "time",
      name: lang.gen("payment.time"),
    },
  ];
  const renderTable = useMemo(() => {
    return (
      <CustomTableHistoryPayment
        headCells={headCells}
        rows={rows ? rows : []}
        page={page}
        pageSize={pageSize}
        totalPage={totalPage}
        total={dataHistory?.data?.pagination.total}
        onChangePage={onChangePage}
        onChangePageSize={handleChangePageSize}
        renderCell={(row, columnKey) => {
          let value = getKeyValue(row, columnKey as any);
          switch (columnKey) {
            case "balance":
              return (
                <p className="text-right">
                  {formatPriceVND(
                    Number(
                      (Number(value) * Number(currency?.exchangeRate)).toFixed(
                        10
                      )
                    )
                  )}
                  {currency?.code}
                </p>
              );
            case "total":
              return (
                <p className="text-right text-[#090A0A] font-normal text-[16px] leading-[20px]">
                  {formatPriceVND(
                    Number(
                      (Number(value) * Number(currency?.exchangeRate)).toFixed(
                        10
                      )
                    )
                  )}
                  {currency?.code}
                </p>
              );
              case "increase":
              return (
                <p className="text-right text-[#090A0A] font-normal text-[16px] leading-[20px]">
                  {value}
                </p>
              );
            case "status":
              return (
                <p
                  className={
                    value == "Thành công" || value == "Success"
                      ? "text-[#23C16B] text-center "
                      : "text-[#FF5247] text-center"
                  }
                >
                  {value}
                </p>
              );
            case "time":
              return <p className="text-[#72777A] text-center">{value}</p>;
          }
          return null;
        }}
      />
    );
  }, [currency, rows]);
  const convertArray = useCallback(
    (originalArray: any[], page: number, pageSize: number) => {
      return originalArray?.map((item, index) => {
        let d = new Date(item?.createdAt);
        let time =
          d.getHours() +
          ":" +
          d.getMinutes() +
          "   " +
          d.getDate() +
          "/" +
          "" +
          (d.getMonth() + 1) +
          "/" +
          d.getFullYear();

        return {
          _id: item?._id || "",
          method:
            item?.type === "order"
              ? lang.gen("recharge.Order")
              : item?.type ==="paypal"? item?.type : 
              item?.type ==="perfectMoney"? item?.type :
              lang.gen("recharge.Depoint") || "",
          total: item?.amount,
          increase:item?.depositDiscountPercent,
          status:
            item?.status === "success"
              ? lang.gen("recharge.statusPaySuccess")
              : lang.gen("recharge.statusPayFail"),
          balance: item?.newBalance,
          time: time || "",
          action: "action",
          stt: index + 1,
        };
      });
    },
    [currency, rows]
  );

  return (
    <div className="p-1 flex flex-col">
      <div className=" w-full p-1 h-full">{renderTable}</div>
    </div>
  );
}
