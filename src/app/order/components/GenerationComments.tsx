import { Button } from "@nextui-org/react";
import GenerationCommentModal from "./GenerationCommentModal";
import "./gcStyle.css";
import ListIcon from "./icons/ListIcon";
import TrashIcon from "./icons/TrashIcon";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
function GenerationComments({ data, comments, setComments }: any) {
  const [name, setName] = useState("");
  useEffect(() => {
    setName("");
    setComments("");
  }, [data]);

  const renderModal = useMemo(() => {
    return (
      <GenerationCommentModal
        data={data}
        onSuccess={(rs: any) => {
          setComments(rs.comments.join("|\n"));
          setName(rs.name);
        }}
      />
    );
  }, [data, name]);

  const renderAlert = useMemo(() => {
    return (
      <>
        {comments.split("|").filter((x: any) => !_.isEmpty(x)).length > 0 &&
        !_.isEmpty(name) ? (
          <div className="gc-alert-container">
            <div className="gc-alert-content">
              Có {comments.split("|").length} bình luận đã được tạo dành cho
              &ldquo;
              {name}&ldquo;
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }, [name, comments, data]);

  return (
    <div className="gc-container">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <ListIcon />
          <div className="gc-title">Danh sách bình luận</div>
        </div>
        {renderModal}
      </div>
      {renderAlert}

      <textarea
        style={{
          whiteSpace: "pre-line",
        }}
        placeholder="Nhập bình luận của bạn"
        className="gc-content"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <div className="gc-content-des">
        Mỗi bình luận cách nhau bằng ký tự &ldquo;|&ldquo;
      </div>
      <div>
        <Button
          onClick={() => {
            setComments("");
          }}
          color="primary"
          variant="bordered"
        >
          <TrashIcon /> Xoá tất cả
        </Button>
      </div>
    </div>
  );
}

export default GenerationComments;
