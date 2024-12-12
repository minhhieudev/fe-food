import MSTFetch from "@/core/services/fetch";

export const SettingRequest = {
  getSettingByCustomer() {
    return MSTFetch.get("/settings/customer");
  },
  getTranslateData() {
    return MSTFetch.get("/settings/translate-data");
  },
};
