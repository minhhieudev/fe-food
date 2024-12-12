import { useEffect, useState } from "react";

import { useAppDispatch } from "@/core/services/hook";
import { PaymentActions } from "@/modules/payment/slice";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { loadScript } from "@paypal/paypal-js";
import { isEmpty } from "lodash";
import { Language } from "../utils/language/language";

function Paypal({ amount ,handleDepoint}) {
  const lang = new Language(window);

  const [isShow, setIsShow] = useState(false);
  const [order, setOrder] = useState(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (order) {
      dispatch(
        PaymentActions.recharge({
          body: {
            type: "recharge",
            order: {
              type: "paypal",
              id: order?.id,
            },
          },
          onSuccess: (rs) => {
            if(rs.success == true){
              dispatch(PaymentActions.getWallet({
                onSuccess: (rs) =>{
                  handleDepoint()
                }
              }))
            }
            setIsShow(false);
          },
          onFail: (rs) => {},
        })
      );
    }
  }, [order]);

  useEffect(() => {
    if (isShow) {
      loadScript({
        "client-id":
          "AXS6oJDw4w24V3-qEZX2NNzckqQfA26GJ3DTtNSymxNT9xNc0CIJgtmr4o89Z1ro8EUtKkjn3cpjsSBr",
      })
        .then((paypal) => {
          paypal
            .Buttons({
              createOrder: (data, actions, err) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: `MST: yêu cầu nạp ${amount}$`,
                      amount: {
                        currency_code: "USD",
                        value: Number(amount),
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setOrder(order);
              },
              onError: (err) => {
              },
            })
            .render("#paypal-content");
        })
        .catch((err) => {
          console.error("failed to load the PayPal JS SDK script", err);
        });
    } else {
      setOrder(undefined);
    }
  }, [amount, isShow, dispatch]);
  return (
    <div>
      <Modal size={"lg"} isOpen={isShow} onClose={() => setIsShow(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {lang.gen("recharge.depositViaPaypal")}
              </ModalHeader>
              <ModalBody>
                <div className="mb-15">
                  {lang.gen("recharge.requestAmount")} {amount}$
                </div>
                <div
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  id="paypal-content"
                />
                <div
                  style={{
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: "#cccccc50",
                  }}
                >
                  <div className="css-s8u2ug-row" data-ppui-info="grid_3.3.3">
                    <div className="css-id1lgz-col_6" data-ppui="true">
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          Email
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            sb-e9yqf25564350@personal.example.com
                          </div>
                        </div>
                      </div>
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          Password
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            showmethemoney
                          </div>
                        </div>
                      </div>
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          Fullname
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            Thảo Quan
                          </div>
                        </div>
                      </div>
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          Credit card number
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            4032033773003129
                          </div>
                        </div>
                      </div>
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          Credit card type
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            VISA
                          </div>
                        </div>
                      </div>
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          Expiration date
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            05/2028
                          </div>
                        </div>
                      </div>
                      <div
                        className="mb-15 css-s8u2ug-row"
                        data-ppui-info="grid_3.3.3"
                      >
                        <div
                          className="text-gray-500 dev_dash_dataline-label css-3jyj59-col_5"
                          data-ppui="true"
                        >
                          CSV
                        </div>
                        <div
                          className="dev_dash_col_msg_second css-1p684bx-col_7"
                          data-ppui="true"
                        >
                          <div
                            className="css-16jt5za-text_body"
                            data-ppui-info="body-text_6.7.4"
                          >
                            113
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {lang.gen("recharge.close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        color="primary"
        onPress={() => {
          if (amount > 0 && !isEmpty(amount)) {
            setIsShow(true);
          }
        }}
      >
        {lang.gen("recharge.buttonrecharge")}
      </Button>
    </div>
  );
}

export default Paypal;
