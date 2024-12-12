import MSTFetch from "@/core/services/fetch";

export const PaymentRequest = {
  getWallet() {
    return MSTFetch.get(`/wallets`);
  },
  getPaymentHistory({
    page,
    pageSize,
    fromDate,
    toDate,
  }: {
    page?: number;
    pageSize?: number;
    fromDate: any;
    toDate: any;
  }) {
    return MSTFetch.get(
      `/payment-activity?${page ? "page=" + page : ""}${
        pageSize ? "&pageSize=" + pageSize : ""
      }${fromDate ? "fromDate=" + fromDate : ""}${
        toDate ? "&toDate=" + toDate : ""
      }`
    );
  },
  recharge(body: any) {
    return MSTFetch.post(`/payment/recharge`, body);
  },
  getQrBank(numberMany: number) {
    return MSTFetch.get(`/settings/customer/get-qr-bank/${numberMany}`);
  },
};
