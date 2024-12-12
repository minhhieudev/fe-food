import MSTFetch from "@/core/services/fetch";

export const ServicesPlatformRequest = {
  getServicesPlatform() {
    return MSTFetch.get(`public-services/platform`);
  },
  getServicesPlatformList({ platform }: { platform: string }) {
    return MSTFetch.get(`public-services/platform/${platform}`);
  },
};
