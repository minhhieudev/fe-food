import MSTFetch from "@/core/services/fetch";

export const ServicesPackageRequest = {
  getServicePackage(platform?: any, id?: any, search?: any) {
    return MSTFetch.get(
      `/service-packages/customers`
      //`/service-packages/customers?scriptGroupCode=${platform}&serviceGroupID=${id}&search=${search}`
    );
  },
  getServicePackagePick(platform?: any, id?: any, search?: any) {
    return MSTFetch.get(
      `/service-packages/customers?scriptGroupCode=${platform}&serviceGroupID=${id}&search=${search}`
    );
  },
  getSearch(search: any) {
    return MSTFetch.get(`/service-packages/customers?search=${search}`);
  },
  getServicePackageHot() {
    return MSTFetch.get(`/service-packages/customers/hot`);
  },
  getDetail(id?: any) {
    return MSTFetch.get(`/service-packages/customers/${id}`);
  },
};
