import MSTFetch from "@/core/services/fetch";

const CurrencyRequest = {
  getDetail: () => {
    return MSTFetch.get("rates/detail");
  },
  getCurrencies: () => {
    return MSTFetch.get("rates");
  },
  setCurrency: (item: any) => {
    return MSTFetch.put("customer", {
      currency: item._id,
    });
  },
};

export default CurrencyRequest;
