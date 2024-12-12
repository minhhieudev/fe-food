import MSTFetch from "@/core/services/fetch";

export const ServicesOrderRequest = {
  genCMT: (body: any) => {
    return MSTFetch.post("/comments/generate", body);
  },
  getChannelInfo: (body: any) => {
    return MSTFetch.post("/channel/get-name", body);
  },
  order(body: any) {
    return MSTFetch.post("/orders", body);
  },
  notiList() {
    return MSTFetch.get("/notifications/customer");
  },
  getOrderStatus(body: any) {
    return MSTFetch.post("/orders/status", body);
  },
  getOrderList({
    page,
    pageSize,
    name,
    status,
    scriptGroupCode,
    startDay,
    endDay,
  }: {
    page?: number;
    pageSize?: number;
    name?: string;
    status?: string;
    scriptGroupCode?: string;
    startDay?: string;
    endDay?: string;
  }) {
    return MSTFetch.get(`/orders?${page ? "page=" + page : ""}${
      pageSize ? "&pageSize=" + pageSize : ""
    }${name ? "&search=" + encodeURIComponent(name) : ""}${
      status ? "&status=" + status : ""
    }${scriptGroupCode ? "&scriptGroupCode=" + scriptGroupCode : ""}${
      startDay ? "&startDay=" + startDay : ""
    }${endDay ? "&endDay=" + endDay : ""}
    `);
  },
  getOrderById({ id }: { id?: any }) {
    return MSTFetch.get(`/orders/${id}`);
  },
  searchOrder(key: any) {
    return MSTFetch.get(`/orders?search=${key}`);
  },
  gets() {
    return MSTFetch.get(`/orders`);
  },
  getSummary(body:any) {
    return MSTFetch.post(`/orders/get-summary`,body);
  },
};
