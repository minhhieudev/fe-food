import MSTFetch from "@/core/services/fetch";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";

function PerfectMoney({ amount }: any) {
  const [isShow, setIsShow] = useState(false);
  const [formPM, setFormPM] = useState<any>();

  const loadForm = async () => {
    const rs = await MSTFetch.post("perfect-money/get-form", {
      amount,
    });
    setFormPM(rs);
    setIsShow(true);
  };

  return (
    <div>
      <Modal size={"lg"} isOpen={isShow} onClose={() => setIsShow(false)}>
        <ModalContent>
          <ModalHeader>Nạp tiền Perfect Money</ModalHeader>
          <ModalBody>
            <div>
              Bạn sẽ được điều hướng tới Perfect Money để thực hiện nạp tiền
            </div>
          </ModalBody>
          <ModalFooter>
            <div
              className="pf"
              dangerouslySetInnerHTML={{
                __html: formPM,
              }}
            ></div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button color="primary" onPress={loadForm}>
        Nạp ngay
      </Button>
    </div>
  );
}

export default PerfectMoney;
