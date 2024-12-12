import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CreateIcon from "./icons/CreateIcon";
import "./gcStyle.css";
import { useAppDispatch } from "@/core/services/hook";
import { ServiceOrderActions } from "@/modules/services.order/slice";
import _, { max } from "lodash";

function GenerationCommentModal({ data, onSuccess }: any) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");
  const [maxCount, setMaxCount] = useState(1);
  const [style, setStyle] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    keyword: "",
    maxCount: "",
    style: "",
    type: "",
  });

  useEffect(() => {
    if (isShow) {
      getChannelInfo();
    } else {
      setStyle("");
      setType("");
      setMaxCount(1);
      setKeyword("");
      setErrorMessage({
        keyword: "",
        maxCount: "",
        style: "",
        type: "",
      });
    }
  }, [isShow]);

  const getChannelInfo = () => {
    dispatch(
      ServiceOrderActions.getChannelInfo({
        body: {
          link: data,
        },
        onSuccess: (rs: any) => {
          setKeyword(rs.name);
        },
        setLoading,
      })
    );
  };

  const onCreate = () => {
    dispatch(
      ServiceOrderActions.genCMT({
        body: {
          keyword,
          maxCount,
          style,
          type,
        },
        onSuccess: (rs: any) => {
          setIsShow(false);
          onSuccess({
            ...rs,
            name: keyword,
          });
        },
      })
    );
  };

  const validate = (callback: any) => {
    let tempError = {
      keyword: "",
      maxCount: "",
      style: "",
      type: "",
    };
    let erCount = 0;

    if (_.isEmpty(keyword)) {
      erCount++;
      tempError.keyword = "Từ khoá không tồn tại";
    }

    if (_.isEmpty(`${maxCount}`)) {
      erCount++;
      tempError.maxCount = "Hãy nhập số lượng";
    } else {
      if (maxCount < 1) {
        erCount++;
        tempError.maxCount = "Số lượng không được nhỏ hơn 1";
      }
    }

    if (_.isEmpty(style)) {
      erCount++;
      tempError.style = "Hãy chọn phong cách";
    }

    if (_.isEmpty(type)) {
      erCount++;
      tempError.type = "Hãy chọn loại bình luận";
    }

    if (erCount === 0) {
      callback();
    } else {
      setErrorMessage(tempError);
    }
  };

  return (
    <div
      role="button"
      className="flex items-center"
      onClick={() => {
        setIsShow(true);
      }}
    >
      <Modal size={"lg"} isOpen={isShow} onClose={() => setIsShow(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="gc-modal-title">Tạo bình luận tự động</div>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div
                    style={{
                      color: "#72777A",
                    }}
                  >
                    Đang tải thông tin...
                  </div>
                ) : (
                  <div>
                    <div className="gc-modal-one-field-container">
                      <div className="gc-modal-one-field-label">
                        Tạo bình luận cho từ khoá này
                      </div>
                      <input
                        value={keyword}
                        onChange={(e: any) => {
                          setErrorMessage({
                            ...errorMessage,
                            keyword: "",
                          });
                          setKeyword(e.target.value);
                        }}className="gc-modal-one-field-input"/>
                      {errorMessage.keyword? <span className="gc-modal-one-field-span">{errorMessage.keyword}</span> : ""}
                    </div>
                    <div className="gc-modal-one-field-container">
                      <div className="gc-modal-one-field-label">Số lượng</div>
                      <input
                        value={`${maxCount}`}
                        type="number"
                        onChange={(e: any) => {
                          setErrorMessage({
                            ...errorMessage,
                            maxCount: "",
                          });
                          setMaxCount(e.target.value);
                        }}className="gc-modal-one-field-input"/>
                        {errorMessage.maxCount? <span className="gc-modal-one-field-span">{errorMessage.maxCount}</span> : ""}
                    </div>
                    <div className="gc-modal-one-field-container">
                      <div className="gc-modal-one-field-label">Phong cách</div>
                      <Select
                        errorMessage={errorMessage.style}
                        onChange={(e: any) => {
                          setErrorMessage({
                            ...errorMessage,
                            style: "",
                          });
                          setStyle(e.target.value);
                        }}
                        labelPlacement="outside"
                        variant="bordered"
                        defaultSelectedKeys={[`${style}`]}
                        selectedKeys={[`${style}`]}
                        aria-label={"style"}
                      >
                        {["Chuyên nghiệp", "Độc đáo", "Bình thường"].map(
                          (style) => (
                            <SelectItem key={`${style}`} value={style}>
                              {`${style}`}
                            </SelectItem>
                          )
                        )}
                      </Select>
                    </div>
                    <div className="gc-modal-one-field-container">
                      <div className="gc-modal-one-field-label">
                        Loại bình luận
                      </div>
                      <Select
                        errorMessage={errorMessage.type}
                        onChange={(e: any) => {
                          setErrorMessage({
                            ...errorMessage,
                            type: "",
                          });
                          setType(e.target.value);
                        }}
                        labelPlacement="outside"
                        variant="bordered"
                        defaultSelectedKeys={[`${type}`]}
                        selectedKeys={[`${type}`]}
                        aria-label={"type"}
                      >
                        {["Tích cực", "Tiêu cực"].map((type) => (
                          <SelectItem key={`${type}`} value={type}>
                            {`${type}`}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Hủy</Button>
                {!loading && (
                  <Button color="primary" onClick={() => validate(onCreate)}>
                    Tạo
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CreateIcon />
      <div className="gc-btn-label">Tạo tự động</div>
    </div>
  );
}

export default GenerationCommentModal;
