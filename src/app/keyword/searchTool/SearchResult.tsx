import { useEffect, useRef, useState } from "react";
import ItemKeyword from "../components/ItemKeyword";

const SearchResult = ({
  toggle = false,
  data,
  onClickItem,
  onClosePopup,
}: {
  toggle: boolean;
  data: { key: string; value: string }[];
  onClickItem?: any;
  onClosePopup?: any;
}) => {
  const [show, setShow] = useState<boolean>(toggle);
  const refItems = useRef<any>(null);

  useEffect(() => {
    if (!show) {
      onClosePopup && onClosePopup();
    }
  }, [show, onClosePopup]);

  useEffect(() => {
    setShow(toggle);
  }, [toggle]);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (!refItems?.current.includes(e.target)) {
        setShow(false);
      }
    });
  }, []);

  const handleClickItem = (item: any) => {
    setShow(false);
    onClickItem && onClickItem(item);
  };

  const handleAddItem = (ref: any) => {
    if (!ref) return;
    if (!refItems.current) {
      refItems.current = [ref];
    } else {
      if (!refItems.current.includes(ref)) {
        refItems.current = [...refItems.current, ref];
      }
    }
  };

  if (!show) return null;
  return (
    <div
      ref={(ref) => handleAddItem(ref)}
      className="absolute overflow-y-scroll right-0 bottom-[-205px] flex flex-col h-[200px] bg-white w-full p-[12px] rounded-[12px] shadow-[0_2px_12px_0_rgba(0, 0, 0, 0.08)] border border-solid border-[#E3E5E5]"
    >
      {!data.length ? (
        <p>Không tìm thấy dữ liệu</p>
      ) : (
        <>
          {data.map((item: any) => (
            <ItemKeyword
              key={item._id}
              item={item}
              handleClickItem={handleClickItem}
              onRef={handleAddItem}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResult;
