"use client";
import { calculatePagination } from "@/app/utils/objectUtils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";
import MSTPagination from "../MSTPagination";
import { Language } from "@/app/utils/language/language";
import MSTPaginationPaypal from "../MSTPaginationPaypal";
const PAGE_SIZES = [5, 10, 20, 100];
export interface HeadCell {
  key: string;
  name: string;
}

export enum HeadCellKey {
  numberOrder = "numberOrder",
  actions = "actions",
}

interface CustomTableProps<T> {
  headCells: HeadCell[];
  rows: T[];
  page?: number;
  pageSize?: number;
  total?: number;
  listPageSize?: number[];
  totalPage?: number;
  onChangePageSize?: (newPageSize: number) => void;
  onChangePage?: (page: number) => void;
  renderCell?: (row: T, columnKey: React.Key) => React.JSX.Element | null;
  getStyleColumn?: (key: string) => React.CSSProperties | undefined;
  onClickEdit?: (row: T) => void;
  onClickDelete?: (row: T) => void;
  tableProps?: TableProps;
  emptyContent?: React.ReactNode;
  customerHeader?: React.ReactNode;
  containerClassName?: string;
}
export const HeadCellBase: { [key in HeadCellKey]: HeadCell } = {
  numberOrder: {
    key: "stt",
    name: "STT",
  },
  actions: {
    key: "actions",
    name: "Thao tác",
  },
};

const CustomTable = <T extends { _id?: string }>(
  props: CustomTableProps<T>
) => {
  const lang = new Language(window);

  const {
    page = 0,
    pageSize = 0,
    listPageSize = PAGE_SIZES,
    totalPage = 0,
    total = 0,
    onChangePageSize = () => {},
    onChangePage = () => {},
    headCells,
    rows,
    onClickEdit,
    onClickDelete,
    renderCell,
    getStyleColumn,
    tableProps = {},
    emptyContent,
    customerHeader = null,
    containerClassName = "",
  } = props;

  const renderTableBottom = () => {
    if (!page) return null;

    const { startIndex, endIndex } = calculatePagination({
      page: page,
      total: total,
      pageSize: pageSize,
    });

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value) {
        onChangePageSize && onChangePageSize(+e.target.value);
      }
    };
    return (
      <div className="flex flex-row w-full justify-between items-center lg:px-4 px-3 py-2">
        <div className="lg:flex-row items-center lg:flex hidden">
          <span className="font-regular text-[#090A0A] text-base">
            {`${startIndex}-${endIndex} `}
            <span className="w-[100px] text-[#72777A]">
              {lang.gen("table.of")}
            </span>
            {` ${total}`}
          </span>
          <Select
            className="w-[80px] ml-6"
            size="sm"
            onChange={onChange}
            labelPlacement="outside"
            variant="bordered"
            defaultSelectedKeys={[`${pageSize}`]}
            selectedKeys={[`${pageSize}`]}
          >
            {listPageSize.map((pageSize) => (
              <SelectItem key={`${pageSize}`} value={pageSize}>
                {`${pageSize}`}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <MSTPaginationPaypal
            total={totalPage}
            onChange={(page: number) => onChangePage && onChangePage(page)}
            page={page}
            initialPage={page}
          />
        </div>
      </div>
    );
  };

  const getStyleColumnBase = (key: string): React.CSSProperties => {
    if (key === HeadCellBase.actions.key)
      return { width: 132, textAlign: "center" };
    if (key === HeadCellBase.numberOrder.key)
      return { width: 20, textAlign: "center" };
    if (key === "name") return { width: 350 };
    if (key === "isActive") return { textAlign: "center" };
    return {};
  };

  const renderCellBase = React.useCallback(
    (row: any, columnKey: React.Key) => {
      const isSystem = !!getKeyValue(row, "isSystem");
      switch (columnKey) {
        case HeadCellBase.actions.key:
          return (
            <div className="flex flex-row justify-center items-center"></div>
          );

        case HeadCellBase.numberOrder.key:
          return (
            <div className="flex flex-row justify-center items-center">
              {getKeyValue(row, columnKey)}
            </div>
          );

        default:
          let value = getKeyValue(row, columnKey as any);
          if (typeof value === "boolean") {
            value = value === true ? "Yes" : "No";
          }
          return value;
      }
    },
    [onClickDelete, onClickEdit]
  );

  return (
    <div
      className={containerClassName || "bg-white lg:rounded-xl lg:pt-4 lg:px-4"}
    >
      {customerHeader}
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          base: "lg:max-h-[calc(100vh-350px)] max-h-[calc(100vh-230px)]",
          wrapper:
            "shadow-none pt-0 px-0 rounded-none m-0 border-t border-t-[#F7F9FA]",
          table: "p-0 m-0 ",
          tbody: "rounded-none",
          thead: "[&>tr]:first:rounded-none sticky z-20 [&>tr]:first:shadow ",
          td: "border-[1px] border-solid border-[#F7F9FA] px-[12px] py-2 text-base font-normal text-[#090A0A] ",
          th: "border-x border-[#F7F9FA] border-solid  text-sm font-bold text-[#72777A]  rounded-none bg-white shadow-none rounded-none",
        }}
        {...tableProps}
        isHeaderSticky
      >
        <TableHeader columns={headCells}>
          {(column) => (
            <TableColumn
              key={column.key}
              style={
                getStyleColumn && getStyleColumn(column.key)
                  ? getStyleColumn(column.key)
                  : getStyleColumnBase(column.key)
              }
            >
              {column.name.toUpperCase()}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          emptyContent={emptyContent || lang.gen("table.empty")}
        >
          {(row) => (
            <TableRow key={row?._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell && renderCell(row, columnKey)
                    ? renderCell(row, columnKey)
                    : renderCellBase(row, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {rows?.length ? renderTableBottom() : <></>}
    </div>
  );
};

export default CustomTable;
