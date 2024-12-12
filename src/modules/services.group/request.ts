import MSTFetch from "@/core/services/fetch";

export const ServicesGroupRequest = {
  getServicesGroup() {
    return MSTFetch.get(`/service-groups/customers`);
  },
};
