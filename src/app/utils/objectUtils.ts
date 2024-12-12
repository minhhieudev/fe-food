// dùng để xoá các trường _id, createdAt, updatedAt khỏi ob (được dùng trong cập nhập sản phẩm)
export function removeFields(object: any) {
  const { _id, createdAt, updatedAt, ...rest } = object;
  return rest;
}

// dùng để tính phân trang
export const calculatePagination = (data: {
  pageSize: number;
  page: number;
  total: number;
}) => {
  const { total, page, pageSize } = data;
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  return {
    startIndex,
    endIndex,
    total,
  };
};

// columSize example :: const columnSize: Record<string, number> = {
//   province: 124,
//   district: 124,
// };

export const getSize = (
  columnName: string,
  columnSize: Record<string, number>
) => {
  return columnSize[columnName];
};

export const calculatePriceCustom = (
  customerEnteredValues: any[],
  servicePackage: any
): number => {
  const priceIncrease = customerEnteredValues.reduce((acc, enterValue) => {
    const customPrice = servicePackage.customPrice.find(
      (item: any) =>
        item.mappingValue === enterValue.enteredValue &&
        item.attributeCode === enterValue.attributeCode
    );
    if (customPrice) {
      if (customPrice.customType === "amount") {
        return acc + customPrice.price;
      } else if (customPrice.customType === "percent") {
        return acc + (customPrice.price / 100) * servicePackage.price;
      } else {
        return acc + 0;
      }
    } else {
      return acc + 0;
    }
  }, 0);
  return servicePackage.price + priceIncrease;
};
