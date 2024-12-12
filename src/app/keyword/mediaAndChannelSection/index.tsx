import { useAppDispatch } from "@/core/services/hook";
import { KeywordActions } from "@/modules/keyword/slice";
import { TopicActions } from "@/modules/topic/slice";
import { useEffect, useState } from "react";
import ModalKeyHot from "../components/modals/ModalKeyHot";
import ChannelHot from "./channelHot";
import MediaHot from "./mediaHot/mediaList";
import "./style.css";

function MediaAndChannelSection() {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(TopicActions.getTopicFollowed({}));
    dispatch(KeywordActions.getKeyHot({}));
    dispatch(KeywordActions.getKeyHotCheck({}));
  }, []);

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <div className="macs-container">
      <ModalKeyHot isOpen={isShowModal} handleClose={handleClose} />
      <div className="macs-header-line" />
      <div className="grid grid-cols-4 gap-4">
        <MediaHot />
        <ChannelHot />
      </div>
    </div>
  );
}

export default MediaAndChannelSection;
